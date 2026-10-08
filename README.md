# ShopZone – React Shopping Cart

A modern, responsive shopping cart application built with **React 19**, **Vite** and the **React Context API**.
Its design is based on the [reference website](https://startling-beijinho-72802b.netlify.app/).

## Features

- **Product catalog**: products in an interactive, responsive grid (1 → 2 → 3 → 4 columns)
- **Product details**: image, title, category, brand, specs, star rating and price
- **Cart operations**
  - Add a product to the cart with a single click
  - Increase or decrease the quantity of each item inside the cart
  - Remove individual items, or clear the whole cart
- **Cart summary**: total item count and total price update in real time (also shown on the navbar badge)
- **Extras**: search, category filters, a slide-in cart drawer (closes with Esc or an overlay click), toast notifications, loading skeletons, and a cart saved in `localStorage` so it survives page reloads
- **Mobile-first, fully responsive** layout for phones, tablets and desktops

## Tech stack

| Concern          | Choice                                                     |
| ---------------- | ---------------------------------------------------------- |
| UI library       | React 19 (function components + hooks)                     |
| Build tool       | Vite 6                                                     |
| Global state     | React Context API + `useReducer`                           |
| Hooks used       | `useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`, `useContext`, `useRef` |
| Styling          | Plain CSS (mobile-first media queries)                     |

## Project structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx         # Logo, search, cart button with live count
│   ├── Hero.jsx           # Promo banner
│   ├── CategoryFilter.jsx # Category chips
│   ├── ProductGrid.jsx    # Responsive grid + loading skeletons
│   ├── ProductCard.jsx    # Single product tile with "Add to Cart"
│   ├── StarRating.jsx     # Star rating display
│   ├── Cart.jsx           # Slide-in cart drawer
│   ├── CartItem.jsx       # Cart row with quantity stepper & remove
│   ├── CartSummary.jsx    # Total items / total price / checkout
│   ├── Toast.jsx          # Notification popup
│   ├── Footer.jsx
│   └── Icons.jsx          # Inline SVG icons
├── context/
│   ├── CartContext.js     # createContext()
│   ├── CartProvider.jsx   # Provider: reducer, derived totals, localStorage sync
│   └── cartReducer.js     # Pure reducer + action types
├── data/
│   └── products.js        # Mock product data
├── hooks/
│   ├── useCart.js         # Access the cart context
│   ├── useProducts.js     # Loads products (simulated API call)
│   └── useToast.js        # Toast notification state
├── utils/
│   └── formatPrice.js     # Currency formatting
├── App.jsx                # Main application component
├── main.jsx               # Entry point (wraps App in CartProvider)
└── index.css              # Global, mobile-first styles
```

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # preview the production build
npm run lint      # run ESLint
```

## How the cart state works

1. `CartProvider` holds the cart in a `useReducer` hook. Every change goes through `cartReducer`
   (`ADD_ITEM`, `INCREASE_QTY`, `DECREASE_QTY`, `REMOVE_ITEM`, `CLEAR_CART`).
2. `totalItems` and `totalPrice` are derived with `useMemo`, so they always match the items.
3. A `useEffect` saves the cart to `localStorage` whenever it changes.
4. Components read the cart and its actions through the custom `useCart()` hook.
