import { FC, useMemo, useState } from "react";
import { Product } from "../types";
import {
  Button,
  Grid,
  Stack,
  Text,
  Link,
  List,
  ListItem,
  Flex,
  HStack,
  Image,
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
    () => cart.reduce((total, { price }) => total + price, 0),
    [cart]
  );

  const text = useMemo(() => {
    return cart
      .reduce(
        (message, { name, price }) =>
          message.concat(`* ${name} - ${parseCurrency(price)}\n`),
        ``
      )
      .concat(`\nTotal: ${parseCurrency(total)}`);
  }, [cart, total]);

  const handleAddToCart = (product: Product) => {
    setCart((cart) => [...cart, product]);
    console.log(cart);
  };

  const handleRemoveFromCart = (index: Number) => {
    setCart((cart) => cart.filter((_, _index) => _index !== index));
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
                onAdd={handleAddToCart}
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
            >
              Ver carrito {cart.length} productos{" "}
            </Button>
          </Flex>
        )}
      </Stack>
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={() => setCartIsOpen(false)}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu pedido</DrawerHeader>

          <DrawerBody>
            {Boolean(!cart.length) ? (
              "Aun no agregaste nada al carrito :("
            ) : (
              <List spacing={4}>
                {cart.map((product, index) => (
                  <ListItem key={product.sku}>
                    <Text fontWeight="500">{product.name}</Text>
                    <HStack justifyContent="space-between">
                      <HStack spacing={3}>
                        <Text color="green.400">
                          {parseCurrency(product.price)}
                        </Text>

                        <Button
                          colorScheme="red"
                          onClick={() => handleRemoveFromCart(index)}
                          size="xs"
                        >
                          X
                        </Button>
                      </HStack>
                    </HStack>
                  </ListItem>
                ))}
              </List>
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
