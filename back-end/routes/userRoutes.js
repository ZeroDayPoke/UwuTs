const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const session = require('express-session');
const MySQLStore = require('connect-mysql-session')(session);

// Setup session store
const sessionStore = new MySQLStore({
    // Database connection options
});

router.use(session({
    secret: 'secret-key', 
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));

// Home route
router.get('/', (req, res) => {
    res.send('Home page');
});

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        req.session.user = user;
        res.send('User created');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        req.session.user = user;
        res.send('User logged in');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Server error');
        }

        res.send('User logged out');
    });
});

// Account route
router.get('/account', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Not logged in');
    }

    res.send(`Welcome, ${req.session.user.name}`);
});

module.exports = router;
