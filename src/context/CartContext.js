import { createContext } from 'react';

/**
 * Global cart context.
 * The value is supplied by <CartProvider /> and consumed through the
 * `useCart` custom hook (see src/hooks/useCart.js).
 */
const CartContext = createContext(null);

export default CartContext;
