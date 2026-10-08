/**
 * Pure reducer that owns every cart state transition.
 * Keeping the logic here (instead of inside components) makes the cart
 * predictable: the only way to change the cart is to dispatch an action.
 *
 * State shape: { items: [{ ...product, quantity }] }
 */

export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  INCREASE_QTY: 'INCREASE_QTY',
  DECREASE_QTY: 'DECREASE_QTY',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
};

export const initialCartState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);

      // Already in the cart -> just bump the quantity.
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }

      return { ...state, items: [...state.items, { ...product, quantity: 1 }] };
    }

    case CART_ACTIONS.INCREASE_QTY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };

    case CART_ACTIONS.DECREASE_QTY:
      return {
        ...state,
        // Quantity never drops below 1; use REMOVE_ITEM to delete a product.
        items: state.items.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };

    case CART_ACTIONS.REMOVE_ITEM:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };

    case CART_ACTIONS.CLEAR_CART:
      return initialCartState;

    default:
      return state;
  }
}
