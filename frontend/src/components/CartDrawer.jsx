import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const CartDrawer = ({ onProceedToCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQty,
    clearCart,
    cartSubtotal,
    shippingPrice,
    taxPrice,
    cartTotal,
  } = useContext(ShopContext);

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.25s ease forwards',
        }}
      />

      {/* Drawer Container */}
      <div
        style={{
          position: 'relative',
          width: 'min(460px, 100vw)',
          height: '100%',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-glass)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={22} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Your Cart</h2>
            <span className="badge badge-primary">
              {cart.reduce((sum, item) => sum + item.qty, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="btn btn-secondary"
            style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'var(--text-muted)',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={38} color="var(--text-muted)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '700' }}>
                  Your cart is empty
                </h3>
                <p style={{ fontSize: '0.88rem', marginTop: '0.2rem' }}>
                  Explore our products and add items to your cart!
                </p>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="cart-item-card"
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  alignItems: 'center',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                  style={{
                    width: '72px',
                    height: '72px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-primary)',
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: 1.2 }}>
                    {item.name}
                  </h4>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '800',
                      color: 'var(--accent-primary)',
                      marginTop: '0.25rem',
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <button
                      onClick={() => updateCartQty(item._id, item.qty - 1)}
                      className="btn btn-secondary"
                      style={{ width: '26px', height: '26px', padding: 0, borderRadius: '4px' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateCartQty(item._id, item.qty + 1)}
                      className="btn btn-secondary"
                      style={{ width: '26px', height: '26px', padding: 0, borderRadius: '4px' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.4rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--bg-glass)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>${cartSubtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span style={{ fontWeight: '700', color: shippingPrice === 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Estimated Tax</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>${taxPrice.toFixed(2)}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: '800',
                paddingTop: '0.6rem',
                borderTop: '1px dashed var(--border-color)',
              }}
            >
              <span>Total</span>
              <span className="gradient-text">${cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem', borderRadius: 'var(--radius-sm)' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={clearCart}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', color: 'var(--text-muted)' }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
