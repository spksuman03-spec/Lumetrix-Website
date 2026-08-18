import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShoppingBag, Sun, Moon, Search, User, Shield, LogOut, Package, Menu, X } from 'lucide-react';

const Navbar = ({ activePage, setActivePage }) => {
  const {
    user,
    logout,
    theme,
    toggleTheme,
    cartItemCount,
    setIsCartOpen,
    searchKeyword,
    setSearchKeyword,
  } = useContext(ShopContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
          gap: '1rem',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <ShoppingBag size={22} />
          </div>
          <div>
            <h1
              className="gradient-text"
              style={{
                fontSize: 'clamp(1.15rem, 4vw, 1.45rem)',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              LUMETRIX
            </h1>
            <span style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em' }}>
              LUXURY STORE
            </span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div
          className="desktop-only"
          style={{
            flex: 1,
            maxWidth: '440px',
            position: 'relative',
            margin: '0 1rem',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Search products, brands, categories..."
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              if (activePage !== 'home') setActivePage('home');
            }}
            style={{
              paddingLeft: '42px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)',
            }}
          />
        </div>

        {/* Desktop Action Controls */}
        <div className="desktop-only" style={{ alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            title="Toggle Light/Dark Theme"
            style={{
              width: '42px',
              height: '42px',
              padding: 0,
              borderRadius: 'var(--radius-full)',
            }}
          >
            {theme === 'dark' ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} color="#06b6d4" />}
          </button>

          {/* Cart Icon Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '0.6rem 1.2rem',
              position: 'relative',
            }}
          >
            <ShoppingBag size={18} />
            <span style={{ fontWeight: '700' }}>Cart</span>
            {cartItemCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--danger)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.6)',
                }}
              >
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Profile / Admin / Login */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {user.isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`btn ${activePage === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                  title="Admin Dashboard"
                >
                  <Shield size={17} />
                  <span>Admin</span>
                </button>
              )}

              <button
                onClick={() => handleNavClick('myorders')}
                className={`btn ${activePage === 'myorders' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
                title="My Orders"
              >
                <Package size={17} />
                <span>Orders</span>
              </button>

              <button
                onClick={logout}
                className="btn btn-secondary"
                style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem' }}
                title="Log Out"
              >
                <LogOut size={17} color="var(--danger)" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="btn btn-secondary"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <User size={18} />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Header Actions (Cart & Hamburger Menu) */}
        <div className="mobile-only" style={{ alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '0.5rem 0.9rem',
              position: 'relative',
            }}
          >
            <ShoppingBag size={18} />
            {cartItemCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--danger)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartItemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-secondary"
            style={{
              width: '42px',
              height: '42px',
              padding: 0,
              borderRadius: 'var(--radius-md)',
            }}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="mobile-only"
          style={{
            flexDirection: 'column',
            gap: '1.2rem',
            padding: '1.25rem 1.5rem 2rem',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            animation: 'fadeIn 0.25s ease forwards',
          }}
        >
          {/* Mobile Search Bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Search products..."
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                if (activePage !== 'home') setActivePage('home');
              }}
              style={{
                paddingLeft: '42px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-tertiary)',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Appearance</span>
              <button
                onClick={toggleTheme}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={16} color="#f59e0b" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={16} color="#6366f1" /> Dark Mode
                  </>
                )}
              </button>
            </div>

            <hr style={{ borderColor: 'var(--border-color)', margin: '0.4rem 0' }} />

            <button
              onClick={() => handleNavClick('home')}
              className={`btn ${activePage === 'home' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <ShoppingBag size={18} />
              <span>Store Catalog</span>
            </button>

            {user ? (
              <>
                {user.isAdmin && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className={`btn ${activePage === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                  >
                    <Shield size={18} />
                    <span>Admin Dashboard</span>
                  </button>
                )}

                <button
                  onClick={() => handleNavClick('myorders')}
                  className={`btn ${activePage === 'myorders' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  <Package size={18} />
                  <span>My Orders</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--danger)' }}
                >
                  <LogOut size={18} />
                  <span>Sign Out ({user.name})</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <User size={18} />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

