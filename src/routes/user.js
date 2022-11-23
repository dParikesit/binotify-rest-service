const express = require('express');
const router = express.Router();

const { createUser, getByUsername, getById } = require('../controllers/user');
const { login } = require('../controllers/auth');

router.post('/register', createUser);
router.post('/login', login);

module.exports = router;
