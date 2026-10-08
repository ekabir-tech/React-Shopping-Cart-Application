import { useMemo, useState } from 'react';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Toast from './components/Toast';
import useProducts from './hooks/useProducts';
import useToast from './hooks/useToast';

const ALL = 'All';

/**
 * Root component: lays out the page and wires search/filter state
 * to the product grid. Cart state lives in CartProvider (see main.jsx).
 */
export default function App() {
  const { products, loading } = useProducts();
  const { toast, showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(ALL);

  // Build the category list from the data itself.
  const categories = useMemo(
    () => [ALL, ...new Set(products.map((p) => p.category))],
    [products],
  );

  // Apply category + search filters.
  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === ALL || p.category === category;
      const matchesSearch =
        !term || p.title.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, searchTerm]);

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Hero />

      <main className="container main">
        <div className="main__head">
          <h2 className="section-title">
            Results <span>({visibleProducts.length} products)</span>
          </h2>
          {!loading && (
            <CategoryFilter categories={categories} active={category} onChange={setCategory} />
          )}
        </div>

        <ProductGrid
          products={visibleProducts}
          loading={loading}
          onAdded={(product) => showToast(`"${product.title}" added to cart`)}
        />
      </main>

      <Footer />
      <Cart onNotify={showToast} />
      <Toast toast={toast} />
    </>
  );
}
