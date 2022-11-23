const express = require('express');
const router = express.Router();

const { createUser, getByUsername, getById } = require('../controllers/user');
const { login } = require('../controllers/auth');
const { authenticateToken } = require('../middlewares/jwt');

router.post('/register', createUser);
router.post('/login', login);
router.get('/test', authenticateToken, (req, res) => {
    res.status(200).json({message: "Test successful!"});
});

module.exports = router;