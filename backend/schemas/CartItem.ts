import { list } from "@keystone-next/keystone";
import { integer, relationship } from "@keystone-next/keystone/fields";
import { inSignedIn, rules } from "../access";

export const CartItem = list({
  access: {
    operation: {
      create: inSignedIn,
      query: rules.canOrder,
      update: rules.canOrder,
      delete: rules.canOrder,
    },
  },
  ui: {
    listView: {
      initialColumns: ["product", "quantity", "user"],
    },
  },
  fields: {
    //TODO Custom label in here
    quantity: integer({
      defaultValue: 1,
      validation: { isRequired: true },
    }),
    product: relationship({ ref: "Product" }),
    user: relationship({ ref: "User.cart" }),
  },
});
