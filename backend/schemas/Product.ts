import { list } from "@keystone-next/keystone";
import {
  integer,
  relationship,
  select,
  text,
} from "@keystone-next/keystone/fields";

export const Product = list({
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
  },
});
