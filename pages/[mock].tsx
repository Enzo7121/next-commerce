import { FC } from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import api from "./product/api";
import { Product } from "./product/types";
import StoreScreen from "./product/screens/Store";
import { ParsedUrlQuery } from "querystring";

interface Props {
  products: Product[];
}

interface Params extends ParsedUrlQuery {
  mock: string;
}

const Home: FC<Props> = ({ products }) => {
  console.log(products);

  return <StoreScreen products={products} />;
};

export const getStaticProps: GetStaticProps<any, Params> = async ({
  params,
}) => {
  console.log(params);

  const products = await api.mock.list(params.mock);

  return {
    props: {
      products,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Home;
