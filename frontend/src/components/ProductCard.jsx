import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Star, ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ product, index = 0, onSelectProduct }) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        animationDelay: `${(index % 12) * 0.05}s`,
      }}
    >
      {/* Product Image Container */}
      <div
        className="product-image-container"
        style={{
          width: '100%',
          height: '240px',
          overflow: 'hidden',
          position: 'relative',
          background: 'var(--bg-tertiary)',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Category Pill */}
        <span
          className="badge badge-primary"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.2)',
          }}
        >
          {product.gender ? `${product.gender} • ${product.category}` : product.category}
        </span>

        {/* Stock Badge */}
        {product.countInStock <= 0 ? (
          <span
            className="badge badge-warning"
            style={{ position: 'absolute', top: '12px', right: '12px' }}
          >
            Out of Stock
          </span>
        ) : (
          <span
            className="badge badge-success"
            style={{ position: 'absolute', top: '12px', right: '12px' }}
          >
            In Stock ({product.countInStock})
          </span>
        )}
      </div>

      {/* Product Info */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {product.brand}
          </div>
          <h3
            onClick={() => onSelectProduct(product)}
            style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              marginTop: '0.2rem',
              cursor: 'pointer',
              lineHeight: 1.35,
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            {product.name}
          </h3>
        </div>

        {/* Rating Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{ display: 'flex', color: '#f59e0b' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                fill={star <= Math.round(product.rating) ? '#f59e0b' : 'none'}
                stroke="#f59e0b"
              />
            ))}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
            {product.rating}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            ({product.numReviews})
          </span>
        </div>

        {/* Footer: Price & Add Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-color)',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              Price
            </span>
            <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'nowrap' }}>
            <button
              onClick={() => onSelectProduct(product)}
              className="btn btn-secondary btn-sm"
              title="Quick Details"
              style={{ borderRadius: 'var(--radius-sm)', padding: '0.35rem 0.6rem' }}
            >
              <Eye size={15} />
            </button>
            <button
              onClick={() => addToCart(product)}
              disabled={product.countInStock <= 0}
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: 'var(--radius-sm)',
                padding: '0.35rem 0.65rem',
                opacity: product.countInStock <= 0 ? 0.5 : 1,
              }}
            >
              <ShoppingCart size={15} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
