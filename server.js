import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/routes.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Book Management System API');
});

app.use('/', routes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} the ${PORT}`)
);
