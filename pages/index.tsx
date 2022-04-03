import { FC } from "react";

import { GetStaticProps } from "next";
import api from "./product/api";
import { Product } from "./product/types";
import StoreScreen from "./product/screens/Store";

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
