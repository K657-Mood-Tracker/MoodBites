require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

const demoUsersRoute = require('./routes/api/demo-users');
app.use('/api/demo-users', demoUsersRoute);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});