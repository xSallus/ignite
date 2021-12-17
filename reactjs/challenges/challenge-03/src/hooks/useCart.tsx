import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { CartProduct, Stock } from '../types';
import { CartProviderProps, UpdateProductAmount, CartContextData } from '../types';

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const product = await api.get<CartProduct>(`products/${productId}`);
      const stock = await api.get<Stock>(`stock/${productId}`);
      const productItem = cart.find(item => item.id ===productId);

      if (productItem && productItem.amount >= stock.data.amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      let neoCart = [];
      if (productItem) {
        neoCart = cart.map(item => {
          const productMatches = item.id === productId;
          if (productMatches) {
            return {
              ...item,
              amount: item.amount + 1,
            };
          } else {
            return item;
          }
        });

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(neoCart));
        setCart(neoCart);
      } else {
        neoCart = [...cart, { ...product.data, amount: 1 }];
      }
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(neoCart));
      setCart(neoCart);
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      const hasInCart = cart.some(item => item.id === productId);
      if(hasInCart) {
        const neoCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(neoCart));
        setCart(neoCart);
      } else {
        return toast.error('Erro na remoção do produto');
      }
    } catch {
      return toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const stock = await api.get<Stock>(`stock/${productId}`);
      const hasInCart = cart.some(item => item.id === productId);
      const hasStock = stock.data.amount > amount;
      const minimumAmount = amount >= 1;
      if (hasInCart && hasStock && minimumAmount) {
        const updatedCart = cart.map(item => {
          if (item.id === productId) {
            return {
              ...item,
              amount: amount,
            };
          } else {
            return item;
          }
        });

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
      } else {
        toast.error('Quantidade solicitada fora de estoque');
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
