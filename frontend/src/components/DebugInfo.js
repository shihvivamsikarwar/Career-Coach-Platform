// 🧪 Temporary Debug Component - Add to App.js to test environment variables

import React, { useEffect } from 'react';

function DebugInfo() {
  const [debugInfo, setDebugInfo] = React.useState({});

  useEffect(() => {
    const info = {
      apiUrl: process.env.REACT_APP_API_URL,
      env: process.env.REACT_APP_ENV,
      nodeEnv: process.env.NODE_ENV,
      allVars: Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')),
    };
    
    setDebugInfo(info);
    console.log('🔍 Debug Info:', info);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h6>🔍 Debug Info</h6>
      <div><strong>API URL:</strong> {debugInfo.apiUrl || 'NOT SET'}</div>
      <div><strong>Environment:</strong> {debugInfo.env || 'NOT SET'}</div>
      <div><strong>Node Env:</strong> {debugInfo.nodeEnv || 'NOT SET'}</div>
      <div><strong>Vars:</strong> {debugInfo.allVars?.join(', ') || 'NONE'}</div>
    </div>
  );
}

export default DebugInfo;
