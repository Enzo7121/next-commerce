import React from "react";
import { Stack, Image, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Product } from "../types";
import { parseCurrency } from "../../../utils/currency";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd }) => {
  return (
    <Stack
      data-test-id="product"
      borderRadius="md"
      padding={4}
      backgroundColor="gray.100"
      key={product.sku}
      spacing={3}
    >
      <Stack spacing={1}>
        <Image
          as={motion.img}
          cursor="pointer"
          layoutId={product.image}
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
        onClick={() => onAdd(product)}
        colorScheme="primary"
        variant="outline"
        size="sm"
      >
        Agregar
      </Button>
    </Stack>
  );
};

export default ProductCard;
