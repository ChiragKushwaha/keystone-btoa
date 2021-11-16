// Ath it's simplest, the access control return a yes or no value depending ont hte users session

import { Permission, permissionsList } from "./schemas/fields";

export function inSignedIn({ session }: any) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission: Permission) => [
    permission,
    function ({ session }: any) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: any): boolean {
    return session?.data.name.includes("chirag");
  },
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageProducts({ session }: any) {
    // 1. Do they have permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: any) {
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything
    }
    // They should only see available products (based on the status field)
    return { status: "AVAILABLE" };
  },
  canOrder({ session }: any) {
    if (!inSignedIn({ session })) {
      return false;
    }
    // 1. Do they have permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: any) {
    // 1. Do they have permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { order: { user: { id: session.itemId } } };
  },
  canManageUsers({ session }: any) {
    if (!inSignedIn({ session })) {
      return false;
    }
    // 1. Do they have permission of canManageCart
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { id: session.itemId };
  },
};
