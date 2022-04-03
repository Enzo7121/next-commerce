import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ProductCard from "../productCard";
import { Product } from "../../types";

const product: Product = {
  category: "category",
  sku: 123,
  name: "name",
  price: 100,
  image: "image",
};
test("should show title, price and a button", () => {
  render(<ProductCard product={product} onAdd={jest.fn()} />);

  const priceRegex = new RegExp(String(product.price), "i");

  expect(screen.getByText(product.name)).toBeInTheDocument();
  expect(screen.getByText(priceRegex)).toBeInTheDocument();
  expect(screen.getByText("Agregar")).toBeInTheDocument();
});

test("should run onAdd when Agregar button has pressed", () => {
  const onAdd = jest.fn();
  render(<ProductCard product={product} onAdd={onAdd} />);

  fireEvent.click(screen.getByText("Agregar"));

  expect(onAdd).toHaveBeenCalled();
});
