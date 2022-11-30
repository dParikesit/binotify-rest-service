const express = require('express');
const router = express.Router();

const { reqSubscribe, getPending, acceptSubscribe, rejectSubscribe } = require('../controllers/soap');

router.post('/new', reqSubscribe);
router.get('/pending', getPending);
router.put('/accept', acceptSubscribe);
router.put('/reject', rejectSubscribe);

module.exports = router;
