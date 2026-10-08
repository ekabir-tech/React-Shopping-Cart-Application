import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import CartContext from './CartContext';
import { CART_ACTIONS, cartReducer, initialCartState } from './cartReducer';

const STORAGE_KEY = 'shopzone-cart';

/** Lazily read a previously saved cart so it survives page reloads. */
function loadInitialCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCartState;
  } catch {
    return initialCartState;
  }
}

/**
 * Wraps the app and exposes cart state + actions to every component.
 */
export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, loadInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist the cart whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be unavailable (private mode) – the cart still works in memory.
    }
  }, [state]);

  // Action creators – memoised so consumers don't re-render needlessly.
  const addToCart = useCallback(
    (product) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product }),
    [],
  );
  const increaseQty = useCallback(
    (id) => dispatch({ type: CART_ACTIONS.INCREASE_QTY, payload: id }),
    [],
  );
  const decreaseQty = useCallback(
    (id) => dispatch({ type: CART_ACTIONS.DECREASE_QTY, payload: id }),
    [],
  );
  const removeFromCart = useCallback(
    (id) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: CART_ACTIONS.CLEAR_CART }), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // Derived values – recalculated in real time whenever items change.
  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );
  const totalPrice = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems,
      totalPrice,
      isCartOpen,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      state.items,
      totalItems,
      totalPrice,
      isCartOpen,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
