import dotenv from 'dotenv';
import db from './config/database.js';
import express from 'express';
import UserModel from './models/User.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

db.sync()
    .then(() => console.log('Table created...'))
    .catch(err => console.log('Error: ' + err));
