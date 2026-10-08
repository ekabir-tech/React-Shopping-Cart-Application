/**
 * Displays a 0–5 star rating using a clipped overlay for partial stars.
 */
export default function StarRating({ rating, reviews }) {
  const percent = `${(rating / 5) * 100}%`;

  return (
    <div className="rating" aria-label={`Rated ${rating} out of 5 from ${reviews} reviews`}>
      <span className="rating__stars" aria-hidden="true">
        ★★★★★
        <span className="rating__fill" style={{ width: percent }}>
          ★★★★★
        </span>
      </span>
      <span className="rating__count">{rating} ({reviews.toLocaleString()})</span>
    </div>
  );
}
