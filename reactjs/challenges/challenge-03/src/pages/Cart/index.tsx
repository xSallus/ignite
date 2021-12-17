import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { CartItem } from '../../components/CartItem';
import { Container, ProductTable, Total } from './styles';

import { CartProduct } from '../../types';

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price*product.amount),
  }));

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        sumTotal += product.price;
        return sumTotal;
      }, 0)
    );

  function handleProductIncrement(product: CartProduct) {
    const neoProduct = { productId: product.id, amount: product.amount+1 };
    updateProductAmount(neoProduct);
  }

  function handleProductDecrement(product: CartProduct) {
    const neoProduct = { productId: product.id, amount: product.amount-1 };
    updateProductAmount(neoProduct);
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {
            cartFormatted.map(product => (
              <CartItem
                key={product.id}
                product={product}
                handleProductIncrement={handleProductIncrement}
                handleProductDecrement={handleProductDecrement}
                handleRemoveProduct={handleRemoveProduct}
              />
            ))
          }
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
