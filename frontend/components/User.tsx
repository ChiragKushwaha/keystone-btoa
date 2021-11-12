import { useQuery, gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query Query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # TODO: Query the cart once have it
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
