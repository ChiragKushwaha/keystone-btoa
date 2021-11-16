import { KeystoneContext } from "@keystone-next/keystone/types";
import stripeConfig from "../lib/stripe";

interface Agruments {
  token: string;
}
const graphql = String.raw;
export default async function checkout(
  root: any,
  { token }: Agruments,
  context: KeystoneContext,
  info
) {
  // 1. Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("Sorry! You must be signed in to create an order");
  }

  const user = await context.query.User.findOne({
    where: { id: userId },
    query: graphql`
    id
    name
    email
    cart {
        id
        quantity
        product {
            name
            price
            description
            id
            photo {
                id
                image {
                    id
                    publicUrlTransformed
                }
            }
        }
    }
    `,
  }).catch(console.error);
  // 2. Calc the total price for their order
  const cartItems = user.cart.filter((cartItem: any) => cartItem.product);
  const amount = cartItems.reduce(function (tally: number, cartItem: any) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  // 3. create the charge with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "INR",
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err.message);
    });

  // 4. Convert the cartItems to OrderItems
  const orderItems = cartItems.map((cartItem: any) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });
  // 5. Create the order and return it
  const order = await context.query.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });
  // 6. Clean up any old cart item
  const cartItemIds = user.cart.map((cartItem) => ({
    id: cartItem.id,
  }));
  await context.query.CartItem.deleteMany({
    where: cartItemIds,
  });
  return order;
}
