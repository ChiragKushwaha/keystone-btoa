import SingleProduct from "../../components/SingleProduct";

const SingleProductPage = ({ query }: any) => {
  return <SingleProduct id={query.id} />;
};

export default SingleProductPage;
