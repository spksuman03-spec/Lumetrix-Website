import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, RefreshCw, Zap, ShieldCheck, Sparkles, X } from 'lucide-react';

const categories = ['All', 'Men', 'Women', 'Kids', 'Electronics', 'Footwear', 'Apparel', 'Toys', 'Audio', 'Gaming', 'Wearables', 'Accessories'];

const Home = ({ onSelectProduct }) => {
  const {
    products,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    searchKeyword,
    setSearchKeyword,
  } = useContext(ShopContext);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 3000]);
    setSortBy('newest');
    setSearchKeyword('');
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Hero Banner Section */}
      <section className="container hero-banner">
        <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
          <div
            className="badge badge-primary"
            style={{ marginBottom: '1rem', padding: '0.4rem 0.8rem', gap: '0.4rem' }}
          >
            <Sparkles size={14} /> Next-Gen Technology 2026
          </div>
          <h1 className="hero-title">
            Elevate Your Digital Experience with <span className="gradient-text">LUMETRIX STORE</span>
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.8rem',
            }}
          >
            Explore high-performance audio, premium gaming setups, and smart wearable technology. Engineered for peak performance and timeless design.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#catalog" className="btn btn-primary">
              <Zap size={18} /> Shop Collection
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} color="var(--success)" /> 2-Year Official Warranty Included
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog with Dynamic Filter Sidebar */}
      <div className="container" id="catalog">
        {/* Mobile Filter Toggle Button */}
        <div className="mobile-only" style={{ marginBottom: '1.25rem', width: '100%' }}>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'space-between', padding: '0.75rem 1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SlidersHorizontal size={18} color="var(--accent-primary)" />
              <span style={{ fontWeight: '700' }}>Filters & Sorting</span>
            </div>
            <span className="badge badge-primary">
              {selectedCategory !== 'All' ? selectedCategory : 'All Products'}
            </span>
          </button>
        </div>

        <div className="catalog-layout">
          {/* Sidebar Filter Panel */}
          <aside
            className={`glass-panel ${showMobileFilters ? 'show-mobile-sidebar' : ''}`}
            style={{
              padding: '1.5rem',
              position: 'sticky',
              top: '96px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={18} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Filters</h3>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <button
                  onClick={resetFilters}
                  className="btn btn-secondary btn-sm"
                  title="Reset Filters"
                  style={{ padding: '0.3rem 0.5rem' }}
                >
                  <RefreshCw size={14} />
                </button>
                {showMobileFilters && (
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="btn btn-secondary btn-sm mobile-only"
                    style={{ padding: '0.3rem 0.5rem' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '1.8rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
                Category
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowMobileFilters(false);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '0.55rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: selectedCategory === cat ? 'var(--accent-primary)' : 'transparent',
                      color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: selectedCategory === cat ? '700' : '500',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.92rem',
                      transition: 'all var(--transition-fast)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Max Price
                </h4>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  ${priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent-primary)',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                <span>$0</span>
                <span>$3,000</span>
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
                Sort By
              </h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
                style={{ cursor: 'pointer' }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div>
            {/* Header bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                  {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Products`}
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Showing {products.length} item{products.length !== 1 ? 's' : ''}
                  {searchKeyword ? ` for "${searchKeyword}"` : ''}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                <RefreshCw size={32} className="animate-spin" style={{ marginBottom: '1rem' }} />
                <p>Fetching inventory...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: 'var(--danger)',
                  marginBottom: '2rem',
                }}
              >
                <h4 style={{ fontWeight: '700' }}>Error Loading Inventory</h4>
                <p style={{ fontSize: '0.9rem' }}>{error}</p>
              </div>
            )}

            {/* Products Grid */}
            {!loading && products.length === 0 ? (
              <div
                className="glass-panel"
                style={{
                  padding: '3rem 1.5rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  No products matched your criteria
                </h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Try adjusting your search keyword or clearing category filters.
                </p>
                <button onClick={resetFilters} className="btn btn-primary btn-sm">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product, idx) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    index={idx}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

