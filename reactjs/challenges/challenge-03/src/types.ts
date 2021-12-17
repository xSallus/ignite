import { ReactNode } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartProduct extends Product {
  amount: number;
}

export interface ProductFormatted extends Product {
  priceFormatted: string;
}

export interface Stock {
  id: number;
  amount: number;
}

export interface CartItemsAmount {
  [key: number]: number;
}

export interface ProductCardProps {
  product: ProductFormatted;
  handleAddProduct: (id: number) => void;
  cartItemsAmount: CartItemsAmount;
}

export interface CartItemProps {
  product: CartProduct & {
    priceFormatted: string;
    subTotal: string;
  };
  handleProductDecrement: (product: CartProduct) => void;
  handleProductIncrement: (product: CartProduct) => void;
  handleRemoveProduct: (productId: number) => void;
}

export interface CartProviderProps {
  children: ReactNode;
}

export interface UpdateProductAmount {
  productId: number;
  amount: number;
}

export interface CartContextData {
  cart: CartProduct[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}
