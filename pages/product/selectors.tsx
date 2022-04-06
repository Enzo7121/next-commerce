import { CartItem, Product } from "./types";

export const editCart = (
  product: Product,
  action: "increment" | "decrement"
) => {
  return (cart: CartItem[]) => {
    const isInCart = cart.find((item) => item.sku === product.sku);

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
  };
};
