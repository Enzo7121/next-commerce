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
      boxShadow="md"
      borderWidth={1}
      borderColor="gray.100"
    >
      <Stack direction="row">
        <Image
          loading="lazy"
          src={product.image}
          width={16}
          height={16}
          objectFit="contain"
          alt={product.name}
          backgroundColor="white"
          borderRadius="md"
        />
        <Stack spacing={1}>
          <Text>{product.name}</Text>
          <Text fontWeight="500" fontSize="md" color="green.500">
            {parseCurrency(product.price)}
          </Text>
        </Stack>
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
