
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
require('dotenv').config({ path: envFile });

// Process-level exception handler
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); //mandatory (as per the Node.js docs)
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const app = express();

app.use(express.json());
//routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500);
  res.json({ message: err.message });
})

app.listen(8080, function() {
  console.log('Server is running on port 8080')
})

console.log('ENV:', process.env.NODE_ENV)
console.log('JWT_SECRET:', process.env.JWT_SECRET)