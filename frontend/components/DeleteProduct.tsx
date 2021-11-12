import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($whereTo: ProductWhereUniqueInput!) {
    deleteProduct(where: $whereTo) {
      id
      name
    }
  }
`;

function update(cache: any, payload: any) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

const DeleteProduct = ({ id, children }: any) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { whereTo: { id } },
    update: update,
  });

  return (
    <button
      type="button"
      onClick={async () => {
        if (confirm("Are you sure you want to delete this item?")) {
          // got ahead and delete it
          await deleteProduct();
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteProduct;
