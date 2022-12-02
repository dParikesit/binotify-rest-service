const express = require('express');
const router = express.Router();

const { reqSubscribe, getPending, acceptSubscribe, rejectSubscribe, getSubStatus, getSubStatusBatch } = require('../controllers/soap');
const { authenticateToken } = require('../middlewares/jwt');
const { authenticateAdmin } = require('../middlewares/auth');

router.post('/new', reqSubscribe);
router.get('/get/:creator_id/:subscriber_id', getSubStatus);
router.get('/getbatch/:subscriber_id', getSubStatusBatch);
router.get('/pending',authenticateToken, authenticateAdmin, getPending);
router.put('/accept',authenticateToken, authenticateAdmin, acceptSubscribe);
router.put('/reject',authenticateToken, authenticateAdmin, rejectSubscribe);

module.exports = router;
