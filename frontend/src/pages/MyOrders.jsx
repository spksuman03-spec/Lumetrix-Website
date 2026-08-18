import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Package, Clock, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import OrderTrackingTimeline from '../components/OrderTrackingTimeline';

const MyOrders = () => {
  const { user, API_BASE } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user) return;
      try {
        const res = await fetch(`${API_BASE}/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order from your purchase history?')) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        setOrders(orders.filter((o) => o._id !== orderId));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to remove order');
      }
    } catch (err) {
      console.error(err);
      alert('Error removing order');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <RefreshCw size={32} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Package size={26} color="var(--accent-primary)" /> My Purchase Orders
      </h2>

      {orders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((ord) => (
            <div key={ord._id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ORDER ID:</span>
                  <div style={{ fontWeight: '700', fontFamily: 'monospace' }}>{ord._id}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className={`badge ${ord.isPaid ? 'badge-success' : 'badge-warning'}`}>
                    {ord.isPaid ? 'Paid' : 'Payment Pending'}
                  </span>
                  <span className={`badge ${ord.isDelivered ? 'badge-success' : 'badge-primary'}`}>
                    {ord.isDelivered ? 'Delivered' : 'Processing Shipping'}
                  </span>
                  <button
                    onClick={() => handleDeleteOrder(ord._id)}
                    className="btn btn-danger btn-sm"
                    title="Remove Order Record"
                    style={{ borderRadius: 'var(--radius-sm)', padding: '0.35rem 0.65rem' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Items in order */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {ord.orderItems?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Qty: {item.qty} x ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <div style={{ fontWeight: '700' }}>${(item.qty * item.price).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>
                  Placed on {new Date(ord.createdAt).toLocaleDateString()}
                </span>
                <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>
                  Total: <span className="gradient-text">${ord.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Flipkart-Style Advanced Live Shipment Timeline */}
              <OrderTrackingTimeline order={ord} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
