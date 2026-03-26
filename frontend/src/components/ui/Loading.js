import React from 'react';
import { COLORS } from '../../constants';

const Loading = ({ 
  size = 'medium', 
  text = 'Loading...', 
  overlay = false,
  className = '' 
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: '20px',
          height: '20px',
          borderWidth: '2px',
        };
      case 'large':
        return {
          width: '60px',
          height: '60px',
          borderWidth: '4px',
        };
      default:
        return {
          width: '40px',
          height: '40px',
          borderWidth: '3px',
        };
    }
  };

  const spinnerStyles = {
    border: `${getSizeStyles().borderWidth} solid ${COLORS.PRIMARY}20`,
    borderTop: `${getSizeStyles().borderWidth} solid ${COLORS.PRIMARY}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    ...getSizeStyles(),
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '20px',
    ...(overlay && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    }),
  };

  return (
    <div className={className} style={containerStyles}>
      <div style={spinnerStyles} />
      {text && (
        <div style={{ 
          color: COLORS.PRIMARY, 
          fontSize: '16px', 
          fontWeight: '500' 
        }}>
          {text}
        </div>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
