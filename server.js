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

// Server Static files
if ((process.env.NODE_ENV = 'production')) {
  // Set static folder
  app.use(express.static('views/build'));

  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'views', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Welcome to BMS API');
  });
}

app.use('/api', routes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} the ${PORT}`)
);
