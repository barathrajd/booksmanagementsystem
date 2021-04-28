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

app.use('/api', routes);

const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

// Server Static files
app.use('/*', (req, res) => {
  if ((process.env.NODE_ENV || '').trim() === 'production') {
    app.use(express.static(path.join(_dirname, '/views/build')));

    res.sendFile(path.resolve(_dirname, 'views', 'build', 'index.html'));
  } else {
    res.send('Hello World!!');
  }
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} the ${PORT}`)
);
