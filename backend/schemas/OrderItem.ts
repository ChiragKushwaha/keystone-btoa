import { list } from "@keystone-next/keystone";
import {
  integer,
  relationship,
  select,
  text,
} from "@keystone-next/keystone/fields";
import { inSignedIn, rules } from "../access";

export const OrderItem = list({
  access: {
    operation: {
      create: inSignedIn,
      query: rules.canManageOrderItems,
      update: () => false,
      delete: () => false,
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    photo: relationship({
      ref: "ProductImage",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
        inlineConnect: true,
      },
    }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({ ref: "Order.items" }),
  },
});
