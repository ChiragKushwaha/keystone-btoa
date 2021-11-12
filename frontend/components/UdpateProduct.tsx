import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      description
      price
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $whereTo: ProductWhereUniqueInput!
    $data: ProductUpdateInput!
  ) {
    updateProduct(where: $whereTo, data: $data) {
      id
      name
      description
      price
    }
  }
`;

const UdpateProduct = ({ id }: any) => {
  // 1. we need  to get the existing product
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  // 2. we need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // 3. we need the form to handle the update
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.product);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit the input fields to the backend
        const res = await updateProduct({
          variables: {
            whereTo: { id },
            data: {
              name: inputs.name,
              description: inputs.description,
              price: inputs.price,
            },
          },
        }).catch(console.error);
        clearForm();
        // const res = await createProduct ({ variables: inputs });
        // Go to that product's page
        // router.push({
        //   pathname: `/product/${res?.data.createProduct.id}`,
        // });
      }}
    >
      <DisplayError error={updateError || error} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="image">
          Image
          <input name="image" onChange={handleChange} type="file" id="image" />
        </label>
        <label htmlFor="name">
          Name
          <input
            required
            value={inputs.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            required
            value={inputs.price}
            onChange={handleChange}
            type="number"
            id="price"
            name="price"
            placeholder="Price"
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            required
            value={inputs.description}
            onChange={handleChange}
            id="description"
            name="description"
            placeholder="Description"
          />
        </label>
        <button type="submit">Update Product</button>
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </fieldset>
    </Form>
  );
};

export default UdpateProduct;
