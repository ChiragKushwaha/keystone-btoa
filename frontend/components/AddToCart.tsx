import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";
import { CURRENT_USER_QUERY } from "./User";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID) {
    addToCart(productId: $id) {
      id
    }
  }
`;

const AddToCart = ({ id }: any) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button disabled={loading} onClick={addToCart.bind(this, id)} type="button">
      Add{loading && "ing"} to Cart 🛒
    </button>
  );
};

export default AddToCart;
