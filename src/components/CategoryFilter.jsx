/**
 * Row of category "chips". The active one is highlighted.
 */
export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="filter" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={active === category}
          className={`filter__chip ${active === category ? 'is-active' : ''}`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
