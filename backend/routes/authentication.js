require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const db = require('../models');

app.use(express.json());

// Registration

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const newUser = await db.User.create({ username, email, password_hash });

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.user.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});