const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/routes');
const { notFound, errorHandler } = require('./middleware/error');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use(notFound);

app.use(errorHandler);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get('/', (req, res) => {
  res.send('Welcome to BMS API');
});

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} the ${PORT}`)
);
