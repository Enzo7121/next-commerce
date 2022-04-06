import { useMemo } from "react";
import { CartItem, Product } from "../types";
import {
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerProps,
  Divider,
  Link,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";

import { parseCurrency } from "../../../utils/currency";

interface Props extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

const CartDrawer: React.FC<Props> = ({
  items,
  onDecrement,
  onIncrement,
  ...props
}) => {
  const total = useMemo(
    () =>
      items.reduce((total, { price, quantity }) => total + price * quantity, 0),
    [items]
  );

  const text = useMemo(() => {
    return items
      .reduce(
        (message, { name, price, quantity }) =>
          message.concat(
            `* ${name} X${quantity} - ${parseCurrency(price * quantity)}\n`
          ),
        ``
      )
      .concat(`\nTotal: ${parseCurrency(total)}`);
  }, [items, total]);

  return (
    <Drawer placement="right" size="sm" {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Tu pedido</DrawerHeader>

        <DrawerBody>
          {Boolean(!items.length) ? (
            "Aun no agregaste nada al carrito :("
          ) : (
            <Stack spacing={4} divider={<Divider />}>
              {items.map((product) => (
                <HStack key={product.sku}>
                  <Stack width="100%">
                    <HStack justifyContent="space-between">
                      <Text fontWeight="500">{product.name}</Text>
                      <Text color="green.400">
                        {parseCurrency(product.price * product.quantity)}
                      </Text>
                    </HStack>
                    <HStack>
                      <Button size="xs" onClick={() => onDecrement(product)}>
                        -
                      </Button>
                      <Text>{product.quantity}</Text>
                      <Button size="xs" onClick={() => onIncrement(product)}>
                        +
                      </Button>
                    </HStack>
                  </Stack>
                </HStack>
              ))}
            </Stack>
          )}
        </DrawerBody>

        {Boolean(items.length) && (
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
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
