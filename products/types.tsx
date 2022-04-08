export default interface Product {
  sku: number;
  category: string;
  name: string;
  price: number;
  image: string;
}

export default interface CartItem {
  sku: number;
  category: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
