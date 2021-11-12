import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import Head from "next/head";
import Link from "next/link";

import { perPage } from "../config";
import DisplayError from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";

export const PAGINATION_QUERY = gql`
  query Query {
    productsCount
  }
`;

export default function Pagination({ page }: any) {
  const { error, data, loading } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { productsCount } = data;
  const pageCount = Math.ceil(productsCount / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Logo | Page {page} of {pageCount}
        </title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{productsCount} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}
