import { FC, useState } from "react";
import { Product, CartItem } from "../types";
import { Button, Grid, Stack, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { editCart } from "../selectors";
import CartDrawer from "../components/CartDrawer";
import ProductCard from "../components/ProductCard";

interface Props {
  products: Product[];
}

const StoreScreen: FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartIsOpen] = useState<boolean>(false);

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
            gridGap={6}
            templateColumns="repeat(auto-fill, minmax(248px, 1fr))"
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
              colorScheme="whatsapp"
              onClick={() => setCartIsOpen(true)}
              width={{ base: "100%", sm: "fit-content" }}
            >
              Ver carrito {cart.reduce((acc, item) => acc + item.quantity, 0)}{" "}
              productos{" "}
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
