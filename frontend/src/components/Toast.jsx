import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Toast = () => {
  const { toast } = useContext(ShopContext);

  if (!toast) return null;

  const bgColors = {
    success: 'rgba(16, 185, 129, 0.95)',
    danger: 'rgba(239, 68, 68, 0.95)',
    warning: 'rgba(245, 158, 11, 0.95)',
    info: 'rgba(99, 102, 241, 0.95)',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: bgColors[toast.type] || bgColors.info,
        color: '#ffffff',
        padding: '0.85rem 1.4rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        fontWeight: '600',
        fontSize: '0.92rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <span>{toast.message}</span>
    </div>
  );
};

export default Toast;
