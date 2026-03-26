import React from 'react';
import { COLORS } from '../../constants';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: COLORS.GRADIENT,
          color: 'white',
          border: 'none',
        };
      case 'secondary':
        return {
          background: 'transparent',
          color: COLORS.PRIMARY,
          border: `1px solid ${COLORS.PRIMARY}`,
        };
      case 'danger':
        return {
          background: COLORS.ERROR,
          color: 'white',
          border: 'none',
        };
      default:
        return {
          background: COLORS.PRIMARY,
          color: 'white',
          border: 'none',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 16px',
          fontSize: '14px',
        };
      case 'large':
        return {
          padding: '16px 32px',
          fontSize: '18px',
        };
      default:
        return {
          padding: '12px 24px',
          fontSize: '16px',
        };
    }
  };

  const baseStyles = {
    borderRadius: '8px',
    fontWeight: '600',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
  };

  return (
    <button
      type={type}
      className={className}
      style={baseStyles}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span>Loading...</span>}
      {children}
    </button>
  );
};

export default Button;
