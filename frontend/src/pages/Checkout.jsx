import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CreditCard, CheckCircle2, MapPin, ShieldCheck, ArrowRight, PackageCheck, Lock } from 'lucide-react';

const Checkout = ({ setActivePage }) => {
  const {
    user,
    cart,
    clearCart,
    cartSubtotal,
    shippingPrice,
    taxPrice,
    cartTotal,
    showToast,
    API_BASE,
  } = useContext(ShopContext);

  const [step, setStep] = useState(1);

  // Form states
  const [address, setAddress] = useState('123 Innovation Way');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94105');
  const [country, setCountry] = useState('United States');

  // Mock Stripe Payment States
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState(user ? user.name : 'Jane Doe');

  const [processing, setProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in before placing an order', 'warning');
      setActivePage('login');
      return;
    }

    setProcessing(true);
    try {
      // Step 1: Create Order
      const orderItems = cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      }));

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          orderItems,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod: 'Stripe Credit Card',
          itemsPrice: cartSubtotal,
          taxPrice,
          shippingPrice,
          totalPrice: cartTotal,
        }),
      });

      const orderData = await res.json();

      if (!res.ok) {
        throw new Error(orderData.message || 'Order creation failed');
      }

      // Step 2: Simulate Stripe Payment Call
      const payRes = await fetch(`${API_BASE}/orders/${orderData._id}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id: 'ch_stripe_' + Math.random().toString(36).substring(2, 10),
          status: 'succeeded',
          email_address: user.email,
        }),
      });

      const paidOrder = await payRes.json();

      setCompletedOrder(paidOrder);
      clearCart();
      setStep(3);
      showToast('Payment successful! Order confirmed.', 'success');
    } catch (err) {
      showToast(err.message || 'Payment simulation failed', 'danger');
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <button onClick={() => setActivePage('home')} className="btn btn-primary">
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.5rem 5rem', maxWidth: '960px' }}>
      {/* Progress Steps Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem 1rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= 1 ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.85rem',
            }}
          >
            1
          </div>
          <span style={{ fontWeight: '700', fontSize: '0.9rem', color: step >= 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            Shipping
          </span>
        </div>

        <div className="desktop-only" style={{ width: '30px', height: '2px', background: 'var(--border-color)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= 2 ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.85rem',
            }}
          >
            2
          </div>
          <span style={{ fontWeight: '700', fontSize: '0.9rem', color: step >= 2 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            Payment
          </span>
        </div>

        <div className="desktop-only" style={{ width: '30px', height: '2px', background: 'var(--border-color)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= 3 ? 'var(--success)' : 'var(--bg-tertiary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.85rem',
            }}
          >
            3
          </div>
          <span style={{ fontWeight: '700', fontSize: '0.9rem', color: step >= 3 ? 'var(--success)' : 'var(--text-muted)' }}>
            Confirmation
          </span>
        </div>
      </div>

      {/* Step 1: Shipping Address */}
      {step === 1 && (
        <div className="checkout-layout">
          <div className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MapPin size={22} color="var(--accent-primary)" /> Shipping Address
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
            >
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Country
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}>
                <span>Continue to Payment</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Order Brief Summary */}
          <div className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {cart.map((item) => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.qty}x {item.name}
                  </span>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <hr style={{ borderColor: 'var(--border-color)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tax</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', paddingTop: '0.4rem', borderTop: '1px dashed var(--border-color)' }}>
                <span>Total</span>
                <span className="gradient-text">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Payment Gateway Form (Mock Stripe Integration) */}
      {step === 2 && (
        <div className="checkout-layout">
          <div className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CreditCard size={22} color="var(--accent-primary)" /> Payment Details
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--success)', fontWeight: '700' }}>
                <Lock size={14} /> Stripe 256-Bit Encrypted
              </div>
            </div>

            {/* Interactive Mock Credit Card Display */}
            <div
              style={{
                width: '100%',
                minHeight: '170px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%)',
                padding: '1.25rem 1.5rem',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginBottom: '1.8rem',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', letterSpacing: '0.1em', fontSize: '1.1rem' }}>VISA</span>
                <ShieldCheck size={26} color="rgba(255,255,255,0.7)" />
              </div>

              <div style={{ fontSize: 'clamp(0.85rem, 4.5vw, 1.25rem)', letterSpacing: '0.12em', fontFamily: 'monospace', fontWeight: '600', margin: '0.8rem 0' }}>
                {cardNumber}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <div>
                  <div style={{ opacity: 0.7, textTransform: 'uppercase', fontSize: '0.65rem' }}>Card Holder</div>
                  <div style={{ fontWeight: '700', textTransform: 'uppercase' }}>{cardName || 'YOUR NAME'}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.7, textTransform: 'uppercase', fontSize: '0.65rem' }}>Expires</div>
                  <div style={{ fontWeight: '700' }}>{cardExpiry}</div>
                </div>
              </div>
            </div>

            {/* Payment Inputs */}
            <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    CVC Code
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="CVC"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                  style={{ flex: '1 0 100px' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary"
                  style={{ flex: '2 0 180px', padding: '0.85rem' }}
                >
                  {processing ? 'Processing Payment API...' : `Pay $${cartTotal.toFixed(2)} Now`}
                </button>
              </div>
            </form>
          </div>

          {/* Shipping Summary Sidebar */}
          <div className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Shipping To</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>{user ? user.name : 'Customer'}</strong>
              <br />
              {address}
              <br />
              {city}, {postalCode}
              <br />
              {country}
            </p>
            <button
              onClick={() => setStep(1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginTop: '0.8rem',
              }}
            >
              Edit Address
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Order Confirmation */}
      {step === 3 && completedOrder && (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            maxWidth: '620px',
            margin: '0 auto',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--success)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <CheckCircle2 size={48} />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Thank you for your purchase. Your order ID is:
            <br />
            <strong style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>
              {completedOrder._id}
            </strong>
          </p>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              marginBottom: '2rem',
              border: '1px solid var(--border-color)',
            }}
          >
            <h4 style={{ fontWeight: '700', marginBottom: '0.8rem', fontSize: '0.95rem' }}>
              Payment Receipt Breakdown
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
                <span style={{ fontWeight: '600' }}>{completedOrder.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Stripe Transaction ID:</span>
                <span style={{ fontFamily: 'monospace' }}>{completedOrder.paymentResult?.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount Paid:</span>
                <span style={{ fontWeight: '800', color: 'var(--success)' }}>
                  ${completedOrder.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setActivePage('home')} className="btn btn-secondary">
              Continue Shopping
            </button>
            <button onClick={() => setActivePage('myorders')} className="btn btn-primary">
              <PackageCheck size={18} /> View My Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
