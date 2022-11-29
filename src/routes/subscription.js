const express = require('express');
const router = express.Router();

const { reqSubscribe } = require('../controllers/soap');

router.post('/new', reqSubscribe);

module.exports = router;
