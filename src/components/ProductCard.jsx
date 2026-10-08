import useCart from '../hooks/useCart';
import formatPrice from '../utils/formatPrice';
import { CheckIcon } from './Icons';
import StarRating from './StarRating';

/**
 * A single product tile: image, category, title, rating, price and
 * an "Add to Cart" button (one click adds the item).
 */
export default function ProductCard({ product, onAdded }) {
  const { items, addToCart } = useCart();
  const cartItem = items.find((item) => item.id === product.id);

  const handleAdd = () => {
    addToCart(product);
    onAdded?.(product);
  };

  return (
    <article className="card">
      <div className="card__media">
        <img src={product.image} alt={product.title} loading="lazy" />
        <span className="card__category">{product.category}</span>
      </div>

      <div className="card__body">
        <p className="card__brand">{product.brand}</p>
        <h3 className="card__title" title={product.title}>
          {product.title}
        </h3>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <p className="card__specs">{product.specs}</p>

        <div className="card__footer">
          <p className="card__price">{formatPrice(product.price)}</p>
          <button type="button" className="btn btn--primary" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>

        {/* Small hint so the user knows the product is already in the cart */}
        <p className={`card__in-cart ${cartItem ? '' : 'is-hidden'}`}>
          <CheckIcon className="icon icon--sm" /> {cartItem?.quantity ?? 0} in cart
        </p>
      </div>
    </article>
  );
}
