import { useEffect, useState } from 'react';
import productData from '../data/products';

/**
 * Loads the product catalog.
 * Simulates an async API call (with a short delay) so the UI handles a
 * loading state the same way it would with a real backend.
 */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productData);
      setLoading(false);
    }, 500);

    // Cleanup: cancel the "request" if the component unmounts.
    return () => clearTimeout(timer);
  }, []);

  return { products, loading };
}
