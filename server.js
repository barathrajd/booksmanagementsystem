const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/routes');
const { notFound, errorHandler } = require('./middleware/error');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Book Management System API');
});

app.use('/', routes);

app.use('/*', (req, res) => {
  if ((process.env.NODE_ENV || '').trim() == 'production') {
    res.sendFile(__dirname + '/views/build/index.html');
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
