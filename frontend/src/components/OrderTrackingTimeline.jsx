import React, { useState } from 'react';
import { CheckCircle2, Truck, PackageCheck, MapPin, Clock, ShieldCheck, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

const OrderTrackingTimeline = ({ order }) => {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  // 100% Dynamic & Realistic Timestamp calculations relative to order creation date
  const orderDate = new Date(order.createdAt || Date.now());
  const isDelivered = Boolean(order.isDelivered);
  const deliveredDate = order.deliveredAt ? new Date(order.deliveredAt) : new Date();

  // Helper to add relative hours and minutes to base date
  const addHours = (baseDate, hours, minutes = 0) => {
    const d = new Date(baseDate.getTime());
    d.setHours(d.getHours() + hours, d.getMinutes() + minutes);
    return d;
  };

  const formatTimestamp = (dateObj) => {
    return dateObj.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatEstDay = (dateObj, dayOffset = 2) => {
    const d = new Date(dateObj.getTime());
    d.setDate(d.getDate() + dayOffset);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    });
  };

  const trackingId = order.trackingId || `SF3467${Math.floor(100000 + Math.random() * 900000)}F`;
  const courierName = order.courierName || 'Shadowfax Express';

  // Real-time Stage Progress calculation relative to order creation and current time
  const now = Date.now();
  const orderTime = orderDate.getTime();
  const hoursPassed = Math.max(0, (now - orderTime) / (1000 * 60 * 60));

  // Determine current active step index (0: Confirmed, 1: Processed, 2: Picked, 3: Shipped, 4: Hub, 5: Out for Delivery, 6: Delivered)
  let currentStepIndex = 0;
  if (isDelivered) {
    currentStepIndex = 6;
  } else if (hoursPassed < 2) {
    currentStepIndex = 1; // Order confirmed, seller processing (Active)
  } else if (hoursPassed < 12) {
    currentStepIndex = 2; // Picked up by partner (Active)
  } else if (hoursPassed < 24) {
    currentStepIndex = 3; // Shipped (Active)
  } else if (hoursPassed < 48) {
    currentStepIndex = 4; // Received at hub (Active)
  } else {
    currentStepIndex = 5; // Out for delivery (Active)
  }

  const getStepStatus = (index) => {
    if (isDelivered) return 'completed';
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'active';
    return 'pending';
  };

  // Calculate unique realistic delivery days (2 to 5 days) per product category & order ID hash
  const getDeliveryDaysOffset = () => {
    if (order.orderItems && order.orderItems.length > 0) {
      const item = order.orderItems[0];
      const cat = (item.category || '').toLowerCase();
      const name = (item.name || '').toLowerCase();

      if (cat.includes('audio') || name.includes('headphone') || name.includes('earbud')) return 2; // Fast 2 days (e.g. Aug 19)
      if (cat.includes('footwear') || name.includes('shoe') || name.includes('sneaker')) return 3; // 3 days (e.g. Aug 20)
      if (cat.includes('apparel') || name.includes('shirt') || name.includes('pant') || name.includes('jeans')) return 3; // 3 days (e.g. Aug 20)
      if (cat.includes('wearables') || cat.includes('gaming') || name.includes('watch') || name.includes('keyboard')) return 4; // 4 days (e.g. Aug 21)
      if (cat.includes('electronics') || name.includes('laptop') || name.includes('camera') || name.includes('macbook')) return 5; // 5 days (e.g. Aug 22)
    }
    const sum = (order._id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 2 + (sum % 4); // Returns 2, 3, 4, or 5 days
  };

  const deliveryDaysOffset = getDeliveryDaysOffset();

  const confirmedTime = formatTimestamp(orderDate);
  const processedTime = formatTimestamp(addHours(orderDate, 1, 30));
  const pickedTime = formatTimestamp(addHours(orderDate, Math.round(deliveryDaysOffset * 4), 0));
  const shippedTime = formatTimestamp(addHours(orderDate, Math.round(deliveryDaysOffset * 8), 0));
  const hubTime = formatTimestamp(addHours(orderDate, Math.round(deliveryDaysOffset * 14), 0));
  const outForDeliveryTime = formatTimestamp(addHours(orderDate, Math.round(deliveryDaysOffset * 20), 0));
  const deliveredTime = isDelivered
    ? formatTimestamp(deliveredDate)
    : `Expected by ${formatEstDay(orderDate, deliveryDaysOffset)}`;

  // 7 Flipkart-style Tracking Milestones
  const steps = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      timestamp: confirmedTime,
      desc: 'Your Order has been placed and confirmed by LUMETRIX.',
      icon: PackageCheck,
      status: getStepStatus(0),
    },
    {
      id: 'processed',
      title: 'Seller Processed',
      timestamp: processedTime,
      desc: getStepStatus(1) === 'active' ? 'Seller is currently packing your order.' : 'Seller has packed and prepared your order for dispatch.',
      icon: ShieldCheck,
      status: getStepStatus(1),
    },
    {
      id: 'picked',
      title: 'Picked Up by Delivery Partner',
      timestamp: pickedTime,
      desc: `Your item is scheduled for pickup by ${courierName}.`,
      icon: Truck,
      status: getStepStatus(2),
    },
    {
      id: 'shipped',
      title: 'Shipped',
      timestamp: shippedTime,
      desc: `Package will be dispatched via ${courierName} (Waybill: ${trackingId}).`,
      icon: Truck,
      status: getStepStatus(3),
    },
    {
      id: 'hub',
      title: 'Received at Hub',
      timestamp: hubTime,
      desc: 'Package will arrive at the sorting hub nearest to your city.',
      icon: MapPin,
      status: getStepStatus(4),
    },
    {
      id: 'out_for_delivery',
      title: 'Out for Delivery',
      timestamp: outForDeliveryTime,
      desc: 'Delivery executive will be assigned to deliver package.',
      icon: Truck,
      status: getStepStatus(5),
    },
    {
      id: 'delivered',
      title: 'Delivered',
      timestamp: deliveredTime,
      desc: isDelivered
        ? 'Your item has been successfully delivered.'
        : 'Package estimated to arrive on time.',
      icon: CheckCircle2,
      status: getStepStatus(6),
    },
  ];

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        marginTop: '1.25rem',
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(15, 23, 42, 0.65)',
        border: '1px solid rgba(6, 182, 212, 0.25)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header Bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          flexWrap: 'wrap',
          gap: '0.6rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
            }}
          >
            <Truck size={20} />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#f8fafc' }}>
              Order Shipment Tracking
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Partner: <strong style={{ color: '#38bdf8' }}>{courierName}</strong> • {trackingId}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyTracking();
            }}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
          >
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Track ID'}
          </button>
          {expanded ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
        </div>
      </div>

      {/* Courier Info Banner */}
      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.12) 0%, rgba(147, 51, 234, 0.12) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div>
          <span style={{ color: '#94a3b8' }}>Courier: </span>
          <span style={{ fontWeight: '700', color: '#38bdf8' }}>{courierName}</span>
          <span style={{ margin: '0 0.5rem', color: '#475569' }}>|</span>
          <span style={{ color: '#94a3b8' }}>AWB: </span>
          <span style={{ fontWeight: '700', color: '#f8fafc', fontFamily: 'monospace' }}>{trackingId}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: '600' }}>
          <Clock size={14} />
          <span>{isDelivered ? 'Delivered' : 'In Transit'}</span>
        </div>
      </div>

      {/* Timeline Steps */}
      {expanded && (
        <div style={{ marginTop: '1.5rem', position: 'relative', paddingLeft: '1.2rem' }}>
          {/* Vertical Progress Line */}
          <div
            style={{
              position: 'absolute',
              left: '23px',
              top: '15px',
              bottom: '25px',
              width: '3px',
              background: 'linear-gradient(180deg, #10b981 0%, #06b6d4 70%, rgba(255,255,255,0.1) 100%)',
              borderRadius: '2px',
            }}
          />

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  marginBottom: idx === steps.length - 1 ? '0' : '1.5rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Node Dot */}
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isCompleted
                      ? '#10b981'
                      : isActive
                      ? '#06b6d4'
                      : 'var(--bg-tertiary)',
                    border: isCompleted
                      ? '3px solid #064e3b'
                      : isActive
                      ? '3px solid #0891b2'
                      : '2px solid rgba(255,255,255,0.2)',
                    boxShadow: isActive ? '0 0 16px #06b6d4' : isCompleted ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={14} color="#ffffff" />
                  ) : isActive ? (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        animation: 'pulseGlow 1.5s infinite',
                      }}
                    />
                  ) : null}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span
                      style={{
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        color: isCompleted ? '#f8fafc' : isActive ? '#38bdf8' : '#64748b',
                      }}
                    >
                      {step.title}
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: isCompleted || isActive ? '#06b6d4' : '#64748b',
                      }}
                    >
                      {step.timestamp}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.83rem',
                      color: isCompleted || isActive ? '#94a3b8' : '#475569',
                      marginTop: '0.2rem',
                      lineHeight: '1.4',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingTimeline;
