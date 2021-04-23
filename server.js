const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/routes');
const { notFound, errorHandler } = require('./middleware/error');
const path = require('path');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use((req, res, next) => {
  if ((process.env.NODE_ENV || '').trim() !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
  }
  next();
});

app.use('/api', routes);

if ((process.env.NODE_ENV || '').trim() === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(302, 'https://' + req.hostname + req.originalUrl);
    } else {
      next();
    }
  });
  app.use(express.static('views/build'));
}

// Server Static files
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('views/build'));

  app.use('*', (req, res) => {
    res.send(path.resolve(__dirname, 'views', 'build', 'index.html'));
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} the ${PORT}`)
);
