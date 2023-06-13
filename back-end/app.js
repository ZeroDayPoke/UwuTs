import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import Sequelize from 'sequelize';
import ConnectSessionSequelize from 'connect-session-sequelize';
import cors from 'cors';

import UserRoutes from './routes/userRoutes.js';
import db from './config/database.js';

dotenv.config();

const SessionStore = ConnectSessionSequelize(session.Store);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

const sessionStore = new SessionStore({ db: sequelize });

const app = express();

const allowedOrigins = ['https://tulsahousesales.com', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
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

app.listen(3100, () => console.log('Server started on port 3100'));

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

db.sync()
  .then(() => console.log('Table created...'))
  .catch(err => console.log('Error: ' + err));
