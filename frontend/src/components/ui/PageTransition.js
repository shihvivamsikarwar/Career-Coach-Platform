import React from 'react';

const PageTransition = ({ children, className = '' }) => {
  return (
    <div className={`page-transition-container ${className}`}>
      <div className="page-transition-content">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
