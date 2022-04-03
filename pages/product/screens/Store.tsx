import { FC, useMemo, useState } from "react";
import { Product } from "../types";
import { Button, Grid, Stack, Text, Link, Flex, Image } from "@chakra-ui/react";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
} from "framer-motion";
import { parseCurrency } from "../../../utils/currency";
import ProductCard from "../components/productCard";

interface Props {
  products: Product[];
}
const StoreScreen: FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleDeleteCart = () => {
    setCart([]);
  };

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
    <LayoutGroup>
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
              as={Link}
              colorScheme="whatsapp"
              href={`https://wa.me/5491124557741?text=${encodeURIComponent(
                text
              )}`}
              isExternal
              leftIcon={
                <Image
                  alt="whatsapp"
                  src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"
                />
              }
            >
              Ver carrito {cart.length} productos{" "}
            </Button>
            <Button
              size="lg"
              padding={4}
              colorScheme="red"
              onClick={handleDeleteCart}
              leftIcon={
                <Image
                  src="https://icongr.am/fontawesome/trash.svg?size=32&color=ff0000"
                  alt="empty"
                />
              }
            >
              Vaciar carrito
            </Button>
          </Flex>
        )}
      </Stack>
      <AnimatePresence>
        {selectedImage && (
          <Flex
            key="backdrop"
            alignItems="center"
            as={motion.div}
            backgroundColor="rgba(0,0,0,0.5)"
            justifyContent="center"
            layoutId={selectedImage}
            position="fixed"
            top={0}
            left={0}
            height="100%"
            width="100%"
            onClick={() => setSelectedImage(null)}
          >
            <Image key="image" src={selectedImage} alt="idk" />
          </Flex>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default StoreScreen;
