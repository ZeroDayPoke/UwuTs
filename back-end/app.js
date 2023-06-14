import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import ConnectSessionSequelize from 'connect-session-sequelize';
import cors from 'cors';

import db from './config/database.js';
import UserRoutes from './routes/userRoutes.js';
import HomeRoutes from './routes/homeRoutes.js';

dotenv.config();

const SessionStore = ConnectSessionSequelize(session.Store);

const sessionStore = new SessionStore({ db: db });

const app = express();

const allowedOrigins = ['https://tulsahousesales.com', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
    },
  }),
);

app.use('/users', UserRoutes);
app.use('/homes', HomeRoutes);

app.listen(3100, () => console.log('Server started on port 3100'));

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

db.sync()
  .then(() => console.log('Table created...'))
  .catch(err => console.log('Error: ' + err));
