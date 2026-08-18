import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ArrowLeft, Star, ShoppingCart, Shield, Truck, Check, MessageSquare } from 'lucide-react';

const ProductDetails = ({ product, onBack }) => {
  const { addToCart, user, showToast, API_BASE } = useContext(ShopContext);

  const [currentProduct, setCurrentProduct] = useState(product);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    setCurrentProduct(product);
  }, [product]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to write a review', 'warning');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch(`${API_BASE}/products/${currentProduct._id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Review submitted successfully!', 'success');
        setComment('');
        // Refetch single product
        const prodRes = await fetch(`${API_BASE}/products/${currentProduct._id}`);
        const updatedProd = await prodRes.json();
        if (prodRes.ok) setCurrentProduct(updatedProd);
      } else {
        showToast(data.message || 'Error submitting review', 'danger');
      }
    } catch (err) {
      showToast('Network error while posting review', 'danger');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!currentProduct) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 4rem' }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="btn btn-secondary"
        style={{ marginBottom: '2rem', gap: '0.5rem', borderRadius: 'var(--radius-full)' }}
      >
        <ArrowLeft size={18} />
        <span>Back to Store</span>
      </button>

      {/* Main Detail Grid */}
      <div className="product-details-grid">
        {/* Product Image Frame */}
        <div
          className="glass-panel"
          style={{
            overflow: 'hidden',
            padding: '1rem',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="product-detail-img"
            style={{
              width: '100%',
              maxHeight: '480px',
              objectFit: 'cover',
              borderRadius: 'var(--radius-md)',
            }}
          />
        </div>

        {/* Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{currentProduct.category}</span>
              <span className="badge badge-success">{currentProduct.brand}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '800', lineHeight: 1.2 }}>
              {currentProduct.name}
            </h1>
          </div>

          {/* Rating Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', color: '#f59e0b' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  fill={star <= Math.round(currentProduct.rating) ? '#f59e0b' : 'none'}
                  stroke="#f59e0b"
                />
              ))}
            </div>
            <span style={{ fontWeight: '700', fontSize: '1rem' }}>{currentProduct.rating}</span>
            <span style={{ color: 'var(--text-muted)' }}>({currentProduct.numReviews} customer reviews)</span>
          </div>

          {/* Price Tag */}
          <div
            style={{
              fontSize: '2.4rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.8rem',
            }}
          >
            <span>${currentProduct.price.toFixed(2)}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>
              Tax Included
            </span>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
            {currentProduct.description}
          </p>

          <hr style={{ borderColor: 'var(--border-color)', margin: '0.5rem 0' }} />

          {/* Quantity and Add Action */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                padding: '0.3rem 0.6rem',
              }}
            >
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="btn btn-secondary btn-sm"
                style={{ border: 'none' }}
              >
                -
              </button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: '700' }}>{qty}</span>
              <button
                onClick={() => setQty(Math.min(currentProduct.countInStock || 99, qty + 1))}
                className="btn btn-secondary btn-sm"
                style={{ border: 'none' }}
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(currentProduct, qty)}
              disabled={currentProduct.countInStock <= 0}
              className="btn btn-primary"
              style={{ flex: 1, minWidth: '150px', padding: '0.85rem 1.25rem' }}
            >
              <ShoppingCart size={19} />
              <span>Add to Cart (${(currentProduct.price * qty).toFixed(2)})</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <Truck size={18} color="var(--accent-primary)" />
              <span>Ships within 24 Hours</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <Shield size={18} color="var(--accent-primary)" />
              <span>Authentic Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <MessageSquare size={22} color="var(--accent-primary)" />
          <span>Customer Reviews ({currentProduct.reviews ? currentProduct.reviews.length : 0})</span>
        </h2>

        <div className="reviews-grid">
          {/* Reviews List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!currentProduct.reviews || currentProduct.reviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No customer reviews yet. Be the first to review this product!</p>
            ) : (
              currentProduct.reviews.map((rev) => (
                <div
                  key={rev._id}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{rev.name}</span>
                    <div style={{ display: 'flex', color: '#f59e0b' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} fill={s <= rev.rating ? '#f59e0b' : 'none'} stroke="#f59e0b" />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{rev.comment}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.4rem' }}>
                    {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Verified Buyer'}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Write a Review</h3>
            {user ? (
              <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Rating Score
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="input-field"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Comment
                  </label>
                  <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Share your experience with this product..."
                    className="input-field"
                  />
                </div>

                <button type="submit" disabled={submittingReview} className="btn btn-primary" style={{ borderRadius: 'var(--radius-sm)' }}>
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Please sign in to your account to leave a review.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
