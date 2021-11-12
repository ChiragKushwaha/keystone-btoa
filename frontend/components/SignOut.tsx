import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = () => {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button onClick={signout as any} type="button">
      Sign Out
    </button>
  );
};

export default SignOut;
