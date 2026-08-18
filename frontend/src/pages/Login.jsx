import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LogIn, Key, Mail, ShieldAlert } from 'lucide-react';

const Login = ({ setActivePage }) => {
  const { login } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      setActivePage('home');
    }
  };

  const fillAdmin = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
  };

  const fillUser = () => {
    setEmail('john@example.com');
    setPassword('user123');
  };

  return (
    <div
      className="container animate-fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 180px)',
        padding: '2rem 1.5rem',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--accent-gradient)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              marginBottom: '1rem',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <LogIn size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Sign in to access your orders and account
          </p>
        </div>

        {/* Quick Test Login Helpers */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)',
            fontSize: '0.82rem',
          }}
        >
          <div style={{ fontWeight: '700', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
            ⚡ Quick Test Credentials:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={fillAdmin}
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, fontSize: '0.78rem' }}
            >
              Fill Admin Account
            </button>
            <button
              onClick={fillUser}
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, fontSize: '0.78rem' }}
            >
              Fill Customer Account
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
              <input
                type="email"
                required
                className="input-field"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Key
                size={18}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <span
            onClick={() => setActivePage('register')}
            style={{ color: 'var(--accent-primary)', fontWeight: '700', cursor: 'pointer' }}
          >
            Create One
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
