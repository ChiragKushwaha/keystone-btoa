import { list } from "@keystone-next/keystone";
import {
  integer,
  relationship,
  select,
  text,
} from "@keystone-next/keystone/fields";
import { inSignedIn, rules } from "../access";

export const Product = list({
  access: {
    operation: {
      create: inSignedIn,
      query: rules.canReadProducts,
      update: rules.canManageProducts,
      delete: rules.canManageProducts,
    },
  },
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    photo: relationship({
      ref: "ProductImage.product",
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
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" },
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
      },
    }),
    price: integer(),
    user: relationship({
      ref: "User.products",
    }),
  },
});
