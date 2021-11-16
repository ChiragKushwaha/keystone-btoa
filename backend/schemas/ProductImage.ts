import { list } from "@keystone-next/keystone";
import { cloudinaryImage } from "@keystone-next/cloudinary";
import "dotenv/config";
import { relationship, text } from "@keystone-next/keystone/fields";
import { inSignedIn, permissions } from "../access";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  apiKey: process.env.CLOUDINARY_KEY as string,
  apiSecret: process.env.CLOUDINARY_SECRET as string,
  folder: "images",
};

export const ProductImage = list({
  access: {
    operation: {
      create: inSignedIn,
      query: () => true,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
    },
  },
  ui: {
    labelField: "altText",
    listView: { initialColumns: ["altText", "image", "product"] },
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: "Source",
    }),
    altText: text({
      validation: {
        isRequired: true,
      },
    }),
    product: relationship({
      ref: "Product.photo",
    }),
  },
});
