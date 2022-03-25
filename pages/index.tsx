import { FC, useMemo, useState } from "react";

import { GetStaticProps } from "next";
import api from "./product/api";
import { Product } from "./product/types";
import { Button, Grid, Stack, Text, Link, Flex, Image } from "@chakra-ui/react";

interface Props {
  products: Product[];
}

const parseCurrency = (value: number) => {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};

const Home: FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const text = useMemo(() => {
    return cart
      .reduce(
        (message, { name, price }) =>
          message.concat(`* ${name} - ${parseCurrency(price)}\n`),
        ``
      )
      .concat(
        `\nTotal: ${parseCurrency(
          cart.reduce((total, { price }) => total + price, 0)
        )}`
      );
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart((cart) => [...cart, product]);
    console.log(cart);
  };

  return (
    <Stack spacing={6}>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(248px, 1fr))">
        {products.map((product) => (
          <Stack
            borderRadius="md"
            padding={4}
            backgroundColor="gray.100"
            key={product.sku}
            spacing={3}
          >
            <Stack spacing={1}>
              <Image
                objectFit="cover"
                borderTopRadius="md"
                src={product.image}
                alt={product.name}
              />
              <Text>{product.name}</Text>
              <Text fontWeight="500" fontSize="sm" color="green.500">
                {parseCurrency(product.price)}
              </Text>
            </Stack>
            <Button
              onClick={() => handleAddToCart(product)}
              colorScheme="primary"
              variant="outline"
              size="sm"
            >
              Agregar
            </Button>
          </Stack>
        ))}
      </Grid>
      {cart.length && (
        <Flex
          padding={4}
          bottom={4}
          position="sticky"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            padding={4}
            as={Link}
            colorScheme="whatsapp"
            href={`https://wa.me/5491124557741?text=${encodeURIComponent(
              text
            )}`}
            isExternal
          >
            Ver carrito {cart.length} productos{" "}
          </Button>
        </Flex>
      )}
    </Stack>
  );
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
