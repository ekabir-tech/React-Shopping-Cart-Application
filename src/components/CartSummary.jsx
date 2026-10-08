import useCart from '../hooks/useCart';
import formatPrice from '../utils/formatPrice';

/**
 * Totals block at the bottom of the cart. Updates in real time.
 */
export default function CartSummary({ onCheckout }) {
  const { totalItems, totalPrice, clearCart } = useCart();

  return (
    <div className="summary">
      <div className="summary__row">
        <span>Total items</span>
        <strong>{totalItems}</strong>
      </div>
      <div className="summary__row">
        <span>Shipping</span>
        <strong className="text-success">Free</strong>
      </div>
      <div className="summary__row summary__row--total">
        <span>Total price</span>
        <strong>{formatPrice(totalPrice)}</strong>
      </div>

      <button type="button" className="btn btn--primary btn--block" onClick={onCheckout}>
        Proceed to checkout
      </button>
      <button type="button" className="btn btn--ghost btn--block" onClick={clearCart}>
        Clear cart
      </button>
    </div>
  );
}
