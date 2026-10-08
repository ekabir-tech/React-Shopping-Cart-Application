import useCart from '../hooks/useCart';
import { CartIcon, LocationIcon, SearchIcon } from './Icons';

/**
 * Top navigation bar: logo, search box and cart button with a live item count.
 */
export default function Navbar({ searchTerm, onSearchChange }) {
  const { totalItems, openCart } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <a href="/" className="navbar__logo" aria-label="ShopZone home">
          Shop<span>Zone</span>
        </a>

        <div className="navbar__deliver">
          <LocationIcon className="icon" />
          <div>
            <small>Deliver to</small>
            <strong>Bangladesh</strong>
          </div>
        </div>

        <label className="navbar__search">
          <span className="visually-hidden">Search products</span>
          <input
            type="search"
            placeholder="Search gaming PCs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="navbar__search-btn">
            <SearchIcon className="icon" />
          </span>
        </label>

        <button
          type="button"
          className="navbar__cart"
          onClick={openCart}
          aria-label={`Open cart, ${totalItems} item${totalItems === 1 ? '' : 's'}`}
        >
          <span className="navbar__cart-icon">
            <CartIcon className="icon icon--lg" />
            <span className="navbar__badge">{totalItems}</span>
          </span>
          <span className="navbar__cart-label">Cart</span>
        </button>
      </div>
    </header>
  );
}
