const express = require('express');
const router = express.Router();

const { createUser, findAll } = require('../controllers/user');
const { login } = require('../controllers/auth');

router.post('/register', createUser);
router.post('/login', login);
router.get('/listpenyanyi', findAll);

module.exports = router;
