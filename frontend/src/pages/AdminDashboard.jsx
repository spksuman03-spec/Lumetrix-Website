import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Shield, Package, DollarSign, ShoppingBag, Plus, Trash2, Edit, Check, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
  const { user, showToast, API_BASE, fetchProducts } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders'
  const [orders, setOrders] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodCategory, setProdCategory] = useState('Audio');
  const [prodStock, setProdStock] = useState('15');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');

  const loadAdminData = async () => {
    if (!user || !user.token) return;
    setLoading(true);
    try {
      // Fetch Orders
      const ordRes = await fetch(`${API_BASE}/orders`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const ordData = await ordRes.json();
      if (ordRes.ok) setOrders(ordData);

      // Fetch Products
      const prodRes = await fetch(`${API_BASE}/products`);
      const prodData = await prodRes.json();
      if (prodRes.ok) setProductsList(prodData.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [user]);

  // Analytics Metrics
  const totalRevenue = orders
    .filter((o) => o.isPaid)
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `${API_BASE}/products/${editingProduct._id}`
        : `${API_BASE}/products`;
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: prodName,
          price: Number(prodPrice),
          brand: prodBrand,
          category: prodCategory,
          countInStock: Number(prodStock),
          description: prodDesc,
          image: prodImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast(editingProduct ? 'Product updated!' : 'New product created!', 'success');
        setIsAddModalOpen(false);
        setEditingProduct(null);
        resetForm();
        loadAdminData();
        fetchProducts(); // Refresh main catalog context
      } else {
        showToast(data.message || 'Action failed', 'danger');
      }
    } catch (err) {
      showToast('Error saving product', 'danger');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) {
        showToast('Product removed', 'info');
        loadAdminData();
        fetchProducts();
      }
    } catch (err) {
      showToast('Error deleting product', 'danger');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order record?')) return;
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) {
        showToast('Order record removed', 'info');
        loadAdminData();
      } else {
        const data = await res.json();
        showToast(data.message || 'Failed to remove order', 'danger');
      }
    } catch (err) {
      showToast('Error removing order', 'danger');
    }
  };

  const handleMarkDelivered = async (orderId) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) {
        showToast('Order marked as Delivered', 'success');
        loadAdminData();
      }
    } catch (err) {
      showToast('Error updating order', 'danger');
    }
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdPrice(p.price);
    setProdBrand(p.brand);
    setProdCategory(p.category);
    setProdStock(p.countInStock);
    setProdDesc(p.description);
    setProdImage(p.image);
    setIsAddModalOpen(true);
  };

  const resetForm = () => {
    setProdName('');
    setProdPrice('');
    setProdBrand('');
    setProdCategory('Audio');
    setProdStock('15');
    setProdDesc('');
    setProdImage('');
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger)' }}>Access Denied</h2>
        <p style={{ color: 'var(--text-muted)' }}>You must be an Administrator to view this panel.</p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            <Shield size={13} /> Admin Portal
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '800' }}>Store Control Center</h1>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-tertiary)', padding: '0.3rem', borderRadius: 'var(--radius-md)', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`btn btn-sm ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`btn btn-sm ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Inventory ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`btn btn-sm ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '700' }}>TOTAL REVENUE</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', marginTop: '0.3rem', color: 'var(--success)' }}>
                ${totalRevenue.toFixed(2)}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '700' }}>TOTAL ORDERS</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', marginTop: '0.3rem', color: 'var(--accent-primary)' }}>
                {orders.length}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '700' }}>PRODUCTS IN CATALOG</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', marginTop: '0.3rem', color: 'var(--text-primary)' }}>
                {productsList.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Manage Inventory</h3>
            <button
              onClick={() => {
                resetForm();
                setEditingProduct(null);
                setIsAddModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
            >
              <Plus size={16} /> Add New Product
            </button>
          </div>

          <div className="glass-panel" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>PRODUCT</th>
                  <th style={{ padding: '1rem' }}>CATEGORY</th>
                  <th style={{ padding: '1rem' }}>PRICE</th>
                  <th style={{ padding: '1rem' }}>STOCK</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                      <span style={{ fontWeight: '700' }}>{p.name}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-primary">{p.category}</span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '700' }}>${p.price.toFixed(2)}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${p.countInStock > 0 ? 'badge-success' : 'badge-warning'}`}>
                        {p.countInStock} left
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button onClick={() => openEdit(p)} className="btn btn-secondary btn-sm" style={{ marginRight: '0.4rem' }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteProduct(p._id)} className="btn btn-danger btn-sm">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Customer Orders</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((ord) => (
              <div key={ord._id} className="glass-panel" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {ord._id}</div>
                    <div style={{ fontWeight: '700' }}>Customer: {ord.user?.name || 'Guest'}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{ord.user?.email}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>${ord.totalPrice?.toFixed(2)}</div>
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem' }}>
                      <span className={`badge ${ord.isPaid ? 'badge-success' : 'badge-warning'}`}>
                        {ord.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                      <span className={`badge ${ord.isDelivered ? 'badge-success' : 'badge-primary'}`}>
                        {ord.isDelivered ? 'Delivered' : 'In Transit'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    {!ord.isDelivered && (
                      <button onClick={() => handleMarkDelivered(ord._id)} className="btn btn-primary btn-sm">
                        <Check size={14} /> Mark Delivered
                      </button>
                    )}
                    <button onClick={() => handleDeleteOrder(ord._id)} className="btn btn-danger btn-sm" title="Remove Order">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: 'min(520px, 95vw)', padding: 'clamp(1.25rem, 3vw, 2rem)', background: 'var(--bg-secondary)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.2rem' }}>
              {editingProduct ? 'Edit Inventory Item' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700' }}>Product Name</label>
                <input type="text" required className="input-field" value={prodName} onChange={(e) => setProdName(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700' }}>Price ($)</label>
                  <input type="number" step="0.01" required className="input-field" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700' }}>Stock Count</label>
                  <input type="number" required className="input-field" value={prodStock} onChange={(e) => setProdStock(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700' }}>Brand</label>
                  <input type="text" required className="input-field" value={prodBrand} onChange={(e) => setProdBrand(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700' }}>Category</label>
                  <select className="input-field" value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}>
                    <option value="Audio">Audio</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700' }}>Image URL</label>
                <input type="text" className="input-field" placeholder="https://images.unsplash.com/..." value={prodImage} onChange={(e) => setProdImage(e.target.value)} />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700' }}>Description</label>
                <textarea rows="3" required className="input-field" value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
