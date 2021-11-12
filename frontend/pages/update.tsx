import React from "react";
import UdpateProduct from "../components/UdpateProduct";

export default function Updatepage({ query }: any) {
  return (
    <div>
      <UdpateProduct id={query.id} />
    </div>
  );
}
