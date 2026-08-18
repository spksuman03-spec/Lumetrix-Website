import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'details' | 'login' | 'register' | 'checkout' | 'myorders' | 'admin'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActivePage('home');
    setSelectedProduct(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Toast />
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <Home onSelectProduct={handleSelectProduct} />
        )}

        {activePage === 'details' && (
          <ProductDetails
            product={selectedProduct}
            onBack={handleBackToHome}
          />
        )}

        {activePage === 'login' && (
          <Login setActivePage={setActivePage} />
        )}

        {activePage === 'register' && (
          <Register setActivePage={setActivePage} />
        )}

        {activePage === 'checkout' && (
          <Checkout setActivePage={setActivePage} />
        )}

        {activePage === 'myorders' && (
          <MyOrders />
        )}

        {activePage === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      <CartDrawer onProceedToCheckout={() => setActivePage('checkout')} />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
