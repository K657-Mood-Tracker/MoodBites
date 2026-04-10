require('dotenv').config();
const express = require('express');

const app = express();
const db = require('./models');
const authenticateToken = require('./middlewares/verifyJWT');

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

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});