import { KeystoneContext } from "@keystone-next/keystone/types";

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext,
  info
) {
  // 1. Query the current user  see if they are signed in
  const sesh = context.session;
  if (!sesh.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  // 2. Query the current user cart
  const allCartItems = await context.query.CartItem.findMany({
    where: {
      user: { id: { equals: sesh.itemId } },
      product: { id: { equals: productId } },
    },
    query: "id, quantity",
  }).catch(console.error);

  const [existingCartItem] = allCartItems;
  // 3. See if the current item is in their cart
  // 4. if it is, increment by 1
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1! `
    );
    return await context.query.CartItem.updateOne({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
      query: "id, quantity",
    });
  }

  // 5. if it is not, create a new cart item!
  return await context.query.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}
