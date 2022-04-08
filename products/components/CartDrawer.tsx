import { useEffect, useMemo } from "react";
import Product from "../types";
import CartItem from "../types";
import {
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerProps,
  Divider,
  Link,
  Stack,
  Button,
  Text,
  Image,
  CloseButton,
} from "@chakra-ui/react";

import { parseCurrency } from "../../utils/currency";

interface Props extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

const CartDrawer: React.FC<Props> = ({
  items,
  onClose,
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

  useEffect(() => {
    if (!items.length) {
      onClose();
    }
  }, [items.length, onClose]);

  return (
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay />
      <DrawerContent paddingTop={4}>
        <DrawerHeader>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="3xl">Tu pedido</Text>
            <CloseButton onClick={onClose} />
          </Stack>
        </DrawerHeader>

        <DrawerBody>
          {Boolean(!items.length) ? (
            "Aun no agregaste nada al carrito :("
          ) : (
            <Stack spacing={4} divider={<Divider />}>
              {items.map((product) => (
                <HStack key={product.sku}>
                  <Stack width="100%">
                    <HStack
                      alignItems="center"
                      fontWeight="500"
                      justifyContent="space-between"
                    >
                      <Text fontSize="lg">{product.name}</Text>
                      <Text>
                        {parseCurrency(product.price * product.quantity)}
                      </Text>
                    </HStack>
                    <HStack>
                      <Button
                        colorScheme="primary"
                        borderRadius={9999}
                        size="xs"
                        onClick={() => onDecrement(product)}
                      >
                        -
                      </Button>
                      <Text fontWeight={500}>{product.quantity}</Text>
                      <Button
                        colorScheme="primary"
                        borderRadius={9999}
                        size="xs"
                        onClick={() => onIncrement(product)}
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

        {Boolean(items.length) && (
          <DrawerFooter>
            <Stack width="100%" spacing={4}>
              <Divider />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                fontWeight={500}
                fontSize="lg"
              >
                <Text>Total</Text>
                <Text>{parseCurrency(total)}</Text>
              </Stack>
              <Button
                width="100%"
                size="lg"
                padding={4}
                as={Link}
                colorScheme="whatsapp"
                href={`https://wa.me/5491124557741?text=${encodeURIComponent(
                  text
                )}`}
                leftIcon={
                  <Image
                    src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff"
                    alt="whatsapp"
                  />
                }
                isExternal
              >
                Completar pedido
              </Button>
            </Stack>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
