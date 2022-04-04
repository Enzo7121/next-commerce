import { FC, useMemo, useState } from "react";
import { Product } from "../types";
import {
  Button,
  Grid,
  Stack,
  Text,
  Link,
  Flex,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { parseCurrency } from "../../../utils/currency";
import ProductCard from "../components/productCard";

interface Props {
  products: Product[];
}

interface CartItem extends Product {
  quantity: number;
}

const StoreScreen: FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartIsOpen] = useState<boolean>(false);

  const total = useMemo(
    () =>
      cart.reduce((total, { price, quantity }) => total + price * quantity, 0),
    [cart]
  );

  const text = useMemo(() => {
    return cart
      .reduce(
        (message, { name, price, quantity }) =>
          message.concat(
            `* ${name} X${quantity} - ${parseCurrency(price * quantity)}\n`
          ),
        ``
      )
      .concat(`\nTotal: ${parseCurrency(total)}`);
  }, [cart, total]);

  const handleEditCart = (
    product: Product,
    action: "increment" | "decrement"
  ) => {
    setCart((cart) => {
      const isInCart = cart.some((item) => item.sku === product.sku);

      if (!isInCart) {
        return cart.concat({ ...product, quantity: 1 });
      }

      return cart.reduce((acc: any, _product) => {
        if (product.sku !== _product.sku) {
          return acc.concat(_product);
        }

        if (action === "decrement") {
          if (_product.quantity === 1) {
            return acc;
          }

          return acc.concat({ ..._product, quantity: _product.quantity - 1 });
        } else if (action === "increment") {
          return acc.concat({ ..._product, quantity: _product.quantity + 1 });
        }
      }, []);
    });
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
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={() => setCartIsOpen(false)}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu pedido</DrawerHeader>

          <DrawerBody>
            {Boolean(!cart.length) ? (
              "Aun no agregaste nada al carrito :("
            ) : (
              <Stack spacing={4} divider={<Divider />}>
                {cart.map((product) => (
                  <HStack key={product.sku}>
                    <Stack width="100%">
                      <HStack justifyContent="space-between">
                        <Text fontWeight="500">{product.name}</Text>
                        <Text color="green.400">
                          {parseCurrency(product.price * product.quantity)}
                        </Text>
                      </HStack>
                      <HStack>
                        <Button
                          size="xs"
                          onClick={() => handleEditCart(product, "decrement")}
                        >
                          -
                        </Button>
                        <Text>{product.quantity}</Text>
                        <Button
                          size="xs"
                          onClick={() => handleEditCart(product, "increment")}
                        >
                          +
                        </Button>
                      </HStack>
                    </Stack>
                  </HStack>
                ))}
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              width="100%"
              size="lg"
              padding={4}
              as={Link}
              colorScheme="whatsapp"
              href={`https://wa.me/5491124557741?text=${encodeURIComponent(
                text
              )}`}
              isExternal
            >
              Completar pedido {parseCurrency(total)}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StoreScreen;
