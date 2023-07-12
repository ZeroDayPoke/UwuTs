// ./app.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import ConnectSessionSequelize from 'connect-session-sequelize';
import cors from 'cors';

import db from './config/database.js';
import { checkAuth } from './middleware/auth.js';
import { ErrorHandler } from './utils/errorHandler.js';

const SessionStore = ConnectSessionSequelize(session.Store);

const app = express();

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(origin.startsWith('http://localhost:')) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SessionStore({
      db: db
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
    },
  }),
);

import UserRoutes from './routes/userRoutes.js';
import HomeRoutes from './routes/homeRoutes.js';

app.use(checkAuth);

app.use('/users', UserRoutes);
app.use('/homes', HomeRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    console.error(err.stack);
    res.status(500).send({ error: 'Something broke!', details: err.message });
  }
});

app.listen(3100, () => console.log('Server started on port 3100'));

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => {
    console.log('Error: ' + err);
    process.exit(1);
  });

db.sync()
  .then(() => console.log('Table created...'))
  .catch(err => {
    console.log('Error: ' + err);
    process.exit(1);
  });

export { ErrorHandler };
