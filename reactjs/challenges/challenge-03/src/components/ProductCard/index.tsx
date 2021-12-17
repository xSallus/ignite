import { MdAddShoppingCart } from 'react-icons/md';

import { ProductCardProps } from '../../types';

export function ProductCard({ product, handleAddProduct, cartItemsAmount }: ProductCardProps) {
  return (
    <li>
      <img
        src={product.image}
        alt={product.title}
      />
      <strong>{product.title}</strong>
      <span>{product.priceFormatted}</span>
      <button
        type="button"
        data-testid="add-product-button"
        onClick={() => handleAddProduct(product.id)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {cartItemsAmount[product.id] || 0}
        </div>

        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </li>
  )
}
