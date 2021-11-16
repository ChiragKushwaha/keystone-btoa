import { list } from "@keystone-next/keystone";
import { text, relationship, password } from "@keystone-next/keystone/fields";
import { permissions, rules } from "../access";

export const User = list({
  access: {
    operation: {
      create: () => true,
      query: rules.canManageUsers,
      update: rules.canManageUsers,
      // only people with the permission can delete themselves
      // you can't delete yourself
      delete: permissions.canManageUsers,
    },
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
    listView: {
      initialColumns: ["name", "posts"],
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    posts: relationship({ ref: "Post.author", many: true }),
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    orders: relationship({ ref: "Order.user", many: true }),
    role: relationship({
      ref: "Role.assignedTo",
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    products: relationship({
      ref: "Product.user",
      many: true,
    }),
  },
});
