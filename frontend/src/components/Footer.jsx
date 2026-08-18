import React from 'react';
import { ShoppingBag, Heart, Shield, Truck, RefreshCw } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: '5rem',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        {/* Value Proposition Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '3rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.8rem', background: 'var(--bg-tertiary)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Express Delivery</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Free shipping over $100</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.8rem', background: 'var(--bg-tertiary)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
              <Shield size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Secure Checkout</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>256-bit SSL Encryption</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.8rem', background: 'var(--bg-tertiary)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>30 Days Returns</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Hassle-free money back</p>
            </div>
          </div>
        </div>

        {/* Brand & Links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <ShoppingBag size={18} />
              </div>
              <h3 className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: '800' }}>LUMETRIX</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Crafted for technology enthusiasts and luxury connoisseurs. Discover high-performance gadgets and premium accessories.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li>Audio & Headphones</li>
              <li>Gaming Peripherals</li>
              <li>Wearable Tech</li>
              <li>Camera & Electronics</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Technologies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li>React.js & Vite</li>
              <li>Node.js & Express</li>
              <li>MongoDB & Mongoose</li>
              <li>REST API Architecture</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.3rem',
          }}
        >
          <span>© {new Date().getFullYear()} LUMETRIX Store. Built with</span>
          <Heart size={14} color="var(--danger)" fill="var(--danger)" />
          <span>using full-stack MERN.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
