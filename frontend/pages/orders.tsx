import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import DisplayError from "../components/ErrorMessage";
import OrderItemStyles from "../components/styles/OrderItemStyles";
import formatMoney from "../lib/formatMoney";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order: any) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) <DisplayError error={error} />;
  const { orders } = data;
  return (
    <div>
      <Head>
        <title>Your Orders {orders.length}</title>
      </Head>
      <h2>You have {orders.length} orders</h2>
      <OrderUl>
        {orders.map((order) => {
          return (
            <OrderItemStyles key={order.id}>
              <Link href={`/order/${order.id}`}>
                <a>
                  <div className="order-meta">
                    <p>{countItemsInAnOrder(order)}</p>
                    <p>
                      {order.items.length} Product
                      {order.items.length === 1 ? "" : "s"}
                    </p>
                    <p>{formatMoney(order.total)}</p>
                  </div>
                  <div className="images">
                    {order.items.map((item) => (
                      <img
                        key={`image-${item.id}`}
                        src={item.photo?.image?.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          );
        })}
      </OrderUl>
    </div>
  );
}
