import React from "react";
import { Stack, Image, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Product from "../types";
import { parseCurrency } from "../../utils/currency";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd }) => {
  return (
    <Stack
      direction="row"
      data-test-id="product"
      borderRadius="md"
      justifyContent="space-between"
      backgroundColor="white"
      key={product.sku}
      spacing={3}
      borderWidth={1}
      borderColor="gray.200"
    >
      <Stack direction="row" padding={4} width="100%">
        <Stack spacing={1} width="100%" justifyContent="space-between">
          <Text noOfLines={1}>{product.name}</Text>
          <Stack
            alignItems="flex-end"
            direction="row"
            justifyContent="space-between"
          >
            <Text fontWeight="500" fontSize="md" color="green.500">
              {parseCurrency(product.price)}
            </Text>
            <Button onClick={() => onAdd(product)} size="sm">
              Agregar
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Image
        loading="lazy"
        src={product.image}
        width={36}
        height={36}
        objectFit="contain"
        alt={product.name}
        backgroundColor="white"
        borderRadius="md"
        minWidth={36}
      />
    </Stack>
  );
};

export default ProductCard;
