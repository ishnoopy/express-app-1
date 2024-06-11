
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
require('dotenv').config({ path: envFile });

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

app.listen(3000, function() {
  console.log('Server is running on port 3000')
})