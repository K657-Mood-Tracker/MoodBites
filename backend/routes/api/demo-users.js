const express = require('express');
const router = express.Router();

const demoUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

router.get('/', (req, res) => {
    res.json(demoUsers);
});

module.exports = router;