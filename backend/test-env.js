require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI ? 'SET' : 'NOT SET');
console.log('PORT:', process.env.PORT || 'NOT SET');
console.log('MongoDB URI length:', process.env.MONGO_URI?.length || 0);
