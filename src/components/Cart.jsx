import { useEffect } from 'react';
import useCart from '../hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { CartIcon, CloseIcon } from './Icons';

/**
 * Slide-in cart drawer. Closes on overlay click or the Escape key.
 */
export default function Cart({ onNotify }) {
  const { items, totalItems, isCartOpen, closeCart, clearCart } = useCart();

  // Close with Escape and lock page scrolling while the drawer is open.
  useEffect(() => {
    if (!isCartOpen) return undefined;

    const handleKey = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, closeCart]);

  const handleCheckout = () => {
    clearCart();
    closeCart();
    onNotify?.('Thank you! Your order has been placed.');
  };

  return (
    // `inert` keeps the hidden drawer out of the tab order and screen readers.
    <div className={`drawer ${isCartOpen ? 'is-open' : ''}`} inert={!isCartOpen}>
      <div className="drawer__overlay" onClick={closeCart} />

      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <header className="drawer__header">
          <h2>
            Shopping Cart <span className="drawer__count">({totalItems})</span>
          </h2>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="Close cart">
            <CloseIcon className="icon" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="drawer__empty">
            <CartIcon className="icon icon--xl" />
            <h3>Your cart is empty</h3>
            <p>Add some products to get started.</p>
            <button type="button" className="btn btn--primary" onClick={closeCart}>
              Go to Shop
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer__items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemoved={(removed) => onNotify?.(`Removed "${removed.title}" from cart`)}
                />
              ))}
            </ul>
            <CartSummary onCheckout={handleCheckout} />
          </>
        )}
      </aside>
    </div>
  );
}
