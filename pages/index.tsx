import { FC } from "react";

import { GetStaticProps } from "next";
import api from "../products/components/api";
import Product from "../products/types";
import StoreScreen from "../products/screens/Store";

interface Props {
  products: Product[];
}

const Home: FC<Props> = ({ products }) => {
  return <StoreScreen products={products} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
  };
};
export default Home;
