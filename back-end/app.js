const db = require('./config/database');
const User = require('./models/User');

const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');

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
