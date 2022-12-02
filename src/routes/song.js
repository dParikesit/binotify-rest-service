const express = require('express');
const router = express.Router();

const { createSong, getAllSongs, getSongById, updateSong, deleteSong, getSongsByPenyanyiId, getSongByPenyanyiId } = require('../controllers/song');
const { authenticateToken } = require('../middlewares/jwt');

router.post('/song/create', authenticateToken, createSong);
router.get('/songs', authenticateToken, getAllSongs);
router.get('/song/:song_id', authenticateToken, getSongById);
router.put('/song/update/:song_id', authenticateToken, updateSong);
router.post('/song/delete/:song_id', authenticateToken, deleteSong);
router.get('/songs/penyanyi/:penyanyi_id', getSongsByPenyanyiId);
router.get('/song/:song_id/penyanyi/:penyanyi_id', authenticateToken, getSongByPenyanyiId);

module.exports = router;
