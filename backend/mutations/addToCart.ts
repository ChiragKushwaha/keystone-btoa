import { KeystoneContext } from "@keystone-next/keystone/types";

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
) {
  // 1. Query the current user  see if they are signed in
  const sesh = context.session;
  if (!sesh.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  // 2. Query the current user cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveField: "id,quantity",
  });
  const [existingCartItem] = allCartItems;
  // 3. See if the current item is in their cart
  // 4. if it is, increment by 1
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1! `
    );
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // 5. if it is not, create a new cart item!
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}
