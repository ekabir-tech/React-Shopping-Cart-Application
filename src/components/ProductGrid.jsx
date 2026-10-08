import ProductCard from './ProductCard';

/**
 * Responsive grid of product cards (1 → 2 → 3 → 4 columns).
 * Shows skeleton placeholders while products are loading.
 */
export default function ProductGrid({ products, loading, onAdded }) {
  if (loading) {
    return (
      <div className="grid" aria-busy="true">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="card card--skeleton" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="empty-state">No products match your search.</p>;
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdded={onAdded} />
      ))}
    </div>
  );
}
