require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./models');
const authenticateToken = require('./middlewares/verifyJWT');
const authRoutes = require('./routes/authentication');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use(express.json()); // Parse JSON bodies
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/', (req, res) => {
app.use('/api', authRoutes);

app.get('/', authenticateToken(), (req, res) => {
  res.send('Hello World!');
});

app.get('/about', authenticateToken(), (req, res) => {
  res.send('This is the about page.');
});

app.post('/verify-token', authenticateToken(), (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

/* const demoUsersRoute = require('./routes/api/demo-users');
app.use('/api/demo-users', demoUsersRoute); */

const moodRoute = require('./routes/api/mood');
app.use('/api/mood', moodRoute);

const habitsRoute = require('./routes/api/habits');
app.use('/api/habits', habitsRoute);

const journalRoute = require('./routes/api/journal');
app.use('/api/journal', journalRoute);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});