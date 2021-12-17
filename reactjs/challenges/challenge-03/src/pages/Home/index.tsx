import React, { useState, useEffect } from 'react';

import { ProductList } from './styles';
// import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../hooks/useCart';

import { ProductFormatted, CartItemsAmount } from '../../types';

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount = {
      ...sumAmount,
      [product.id]: product.amount,
    };
    console.log(sumAmount);
    return sumAmount;
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const formattedCart = cart.map(item => ({
        ...item,
        priceFormatted: formatPrice(item.amount),
      }));

      setProducts(formattedCart);
    }

    loadProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {
        products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            cartItemsAmount={cartItemsAmount}
            handleAddProduct={handleAddProduct}
          />
        ))
      }
    </ProductList>
  );
};

export default Home;
