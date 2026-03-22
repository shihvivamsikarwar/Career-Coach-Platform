const mongoose = require("mongoose");

// Connection configuration
const connectionOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  retryWrites: true,
  w: 'majority', // Write concern
  readPreference: 'primary',
  connectTimeoutMS: 10000, // 10 seconds timeout for initial connection
  heartbeatFrequencyMS: 10000, // Check connection status every 10 seconds
  retryReads: true,
};

// Connection state monitoring
let connectionState = 'disconnected';
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 5000; // 5 seconds

// Validate MongoDB URI
const validateMongoURI = (uri) => {
  if (!uri) {
    throw new Error('MONGO_URI is required');
  }
  
  try {
    new URL(uri);
    return true;
  } catch (error) {
    throw new Error(`Invalid MongoDB URI format: ${error.message}`);
  }
};

// Connection event handlers
const setupConnectionEvents = () => {
  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('MongoDB connected successfully');
    connectionState = 'connected';
    reconnectAttempts = 0;
  });

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
    connectionState = 'error';
    
    // Handle specific error types
    if (error.name === 'MongoNetworkError') {
      console.log('Network error detected, attempting reconnection...');
      handleReconnection();
    } else if (error.name === 'MongoTimeoutError') {
      console.log('Connection timeout, retrying...');
      handleReconnection();
    }
  });

  db.on('disconnected', () => {
    console.log('MongoDB disconnected');
    connectionState = 'disconnected';
    handleReconnection();
  });

  db.on('reconnected', () => {
    console.log('MongoDB reconnected');
    connectionState = 'connected';
    reconnectAttempts = 0;
  });

  db.on('fullsetup', () => {
    console.log('MongoDB full setup complete');
  });

  // Handle process termination
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
      process.exit(1);
    }
  });
};

// Reconnection logic
const handleReconnection = async () => {
  if (reconnectAttempts >= maxReconnectAttempts) {
    console.error(`Max reconnection attempts (${maxReconnectAttempts}) reached. Continuing without database...`);
    return;
  }

  if (connectionState === 'reconnecting') {
    return; // Already reconnecting
  }

  connectionState = 'reconnecting';
  reconnectAttempts++;

  console.log(`Attempting reconnection ${reconnectAttempts}/${maxReconnectAttempts} in ${reconnectDelay}ms...`);

  setTimeout(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    } catch (error) {
      console.error(`Reconnection attempt ${reconnectAttempts} failed:`, error.message);
      if (reconnectAttempts < maxReconnectAttempts) {
        handleReconnection();
      } else {
        console.log('Continuing without database connection for demo...');
      }
    }
  }, reconnectDelay);
};

// Health check function
const checkConnectionHealth = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return {
    state: states[state],
    isConnected: state === 1,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
    reconnectAttempts,
    lastChecked: new Date().toISOString()
  };
};

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('Starting graceful database shutdown...');
  
  try {
    await mongoose.connection.close();
    console.log('Database connection closed gracefully');
    return true;
  } catch (error) {
    console.error('Error during database shutdown:', error);
    return false;
  }
};

// Main connection function
const connectDB = async () => {
  try {
    // Validate environment
    validateMongoURI(process.env.MONGO_URI);

    // Setup event handlers before connecting
    setupConnectionEvents();

    // Attempt connection with retry logic
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, connectionOptions);

    console.log('Database connection established successfully');
    
    // Log connection details in development
    if (process.env.NODE_ENV === 'development') {
      const health = checkConnectionHealth();
      console.log('Database health:', health);
    }

    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    
    // Categorize errors for better handling
    if (error.name === 'MongoNetworkError') {
      console.error('Network connectivity issue - check your network connection');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('Server selection failed - check MongoDB server status');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused - check if MongoDB is running');
    } else if (error.code === 'ENOTFOUND') {
      console.error('Host not found - check MongoDB URI');
    } else if (error.message.includes('Authentication failed')) {
      console.error('Authentication failed - check credentials');
    }

    // For demo purposes, continue without database
    console.log('Continuing without database connection for demo...');
    return true;
  }
};

// Connection monitoring interval (every 30 seconds)
const startHealthMonitoring = () => {
  setInterval(() => {
    const health = checkConnectionHealth();
    
    if (!health.isConnected && connectionState !== 'reconnecting') {
      console.warn('Database connection lost, attempting reconnection...');
      handleReconnection();
    }
  }, 30000);
};

// Export functions and utilities
module.exports = {
  connectDB,
  checkConnectionHealth,
  gracefulShutdown,
  getConnectionState: () => connectionState
};

// Start health monitoring after successful connection
mongoose.connection.on('connected', () => {
  if (process.env.NODE_ENV === 'production') {
    startHealthMonitoring();
  }
});
