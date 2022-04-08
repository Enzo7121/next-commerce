import { FC, useMemo, useState } from "react";
import CartItem from "../types";
import Product from "../types";
import { Button, Grid, Stack, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import editCart from "../components/selectors";
import CartDrawer from "../components/CartDrawer";
import ProductCard from "../components/ProductCard";

interface Props {
  products: Product[];
}

const StoreScreen: FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartIsOpen] = useState<boolean>(false);

  const quantity = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const handleEditCart = (
    product: Product,
    action: "increment" | "decrement"
  ) => {
    setCart(editCart(product, action));
  };

  return (
    <>
      <Stack spacing={6}>
        {Boolean(products.length) ? (
          <Grid
            gridGap={8}
            templateColumns={{
              base: "repeat(auto-fill, minmax(240px, 1fr))",
              sm: "repeat(auto-fill, minmax(420px, 1fr))",
            }}
          >
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.sku}
                onAdd={(product) => handleEditCart(product, "increment")}
              />
            ))}
          </Grid>
        ) : (
          <Text fontSize="lg" color="gray.400" margin="auto">
            No hay productos
          </Text>
        )}
        {cart.length && (
          <Flex
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            as={motion.div}
            padding={4}
            bottom={4}
            position="sticky"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              size="lg"
              padding={4}
              boxShadow="xl"
              colorScheme="primary"
              onClick={() => setCartIsOpen(true)}
              width={{ base: "100%", sm: "fit-content" }}
            >
              <Stack direction="row" spacing={6} alignItems="center">
                <Stack direction="row" spacing={3} alignItems="center">
                  <Text fontSize="md"> Ver pedido</Text>
                  <Text
                    backgroundColor="rgba(0,0,0,0.25)"
                    padding={1}
                    fontSize="xs"
                    borderRadius="sm"
                    fontWeight="500"
                    color="gray.100"
                  >
                    {quantity > 1 ? `${quantity} items` : `${quantity} item`}
                  </Text>
                </Stack>
              </Stack>
            </Button>
          </Flex>
        )}
      </Stack>
      <CartDrawer
        items={cart}
        onIncrement={(product) => handleEditCart(product, "increment")}
        onDecrement={(product) => handleEditCart(product, "decrement")}
        isOpen={isCartOpen}
        onClose={() => setCartIsOpen(false)}
      />
    </>
  );
};

export default StoreScreen;
