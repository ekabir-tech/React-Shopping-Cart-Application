import useCart from '../hooks/useCart';
import formatPrice from '../utils/formatPrice';
import { MinusIcon, PlusIcon, TrashIcon } from './Icons';

/**
 * One row inside the cart: thumbnail, details, quantity stepper and remove button.
 */
export default function CartItem({ item, onRemoved }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
    onRemoved?.(item);
  };

  return (
    <li className="cart-item">
      <img className="cart-item__img" src={item.image} alt={item.title} />

      <div className="cart-item__info">
        <p className="cart-item__category">{item.category}</p>
        <h4 className="cart-item__title">{item.title}</h4>
        <p className="cart-item__unit">{formatPrice(item.price)} each</p>

        <div className="cart-item__actions">
          <div className="qty" role="group" aria-label={`Quantity for ${item.title}`}>
            <button
              type="button"
              onClick={() => decreaseQty(item.id)}
              disabled={item.quantity === 1}
              aria-label="Decrease quantity"
            >
              <MinusIcon className="icon icon--sm" />
            </button>
            <span aria-live="polite">{item.quantity}</span>
            <button type="button" onClick={() => increaseQty(item.id)} aria-label="Increase quantity">
              <PlusIcon className="icon icon--sm" />
            </button>
          </div>

          <button type="button" className="cart-item__remove" onClick={handleRemove}>
            <TrashIcon className="icon icon--sm" /> Remove
          </button>
        </div>
      </div>

      <p className="cart-item__subtotal">{formatPrice(item.price * item.quantity)}</p>
    </li>
  );
}
