const express = require('express');
const router = express.Router();

const { reqSubscribe, getPending, acceptSubscribe, rejectSubscribe, getSubscribe } = require('../controllers/soap');

router.post('/new', reqSubscribe);
router.get('/get/:creator_id/:subscriber_id', getSubscribe);
router.get('/pending', getPending);
router.put('/accept', acceptSubscribe);
router.put('/reject', rejectSubscribe);

module.exports = router;
