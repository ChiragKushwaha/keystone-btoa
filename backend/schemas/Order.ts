import { graphql, list } from "@keystone-next/keystone";
import {
  integer,
  relationship,
  text,
  virtual,
} from "@keystone-next/keystone/fields";
import { inSignedIn, rules } from "../access";
import formatMoney from "../lib/formatMoney";

export const Order = list({
  access: {
    operation: {
      create: inSignedIn,
      query: rules.canOrder,
      update: () => false,
      delete: () => false,
    },
  },
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve: function (item) {
          return `cool ${formatMoney(item.total)}`;
        },
      }),
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});
