const Song = require('../models').Song;

const createSong = (req, res) => {
    const data = req.body;
    Song.create({
        song_id: data.song_id,
        judul: data.judul,
        penyanyi_id: data.penyanyi_id,
        audio_path: data.audio_path,
    }).then(song => {
        res.status(201).json({message: "Song created!"});
    }).catch(error => {
        res.status(400).json({message: "There is an error!"});
    })
}

const getAllSongs = (req, res) => {
    Song.findAll().then(songs => {
        res.status(200).json(songs);
    }).catch(error => {
        res.status(400).json({message: "There is an error!"});
    })
}

const getSongById = (req, res) => {
    const song_id = req.params.song_id;
    Song.findByPk(song_id).then(song => {
        if (!song) {
            return res.status(404).send({message: "Song not found!"});
        }
        res.status(200).json(song);
    }).catch(error => {
        res.status(400).json({message: "There is an error!"});
    })
}

const updateSong = (req, res) => {
    const song_id = req.params.song_id;
    const data = req.body;
    Song.update({
        judul: data.judul,
        penyanyi_id: data.penyanyi_id,
        audio_path: data.audio_path,
    }, {where: {song_id: song_id}}).then(song => {
        res.status(200).json({message: "Song updated!"});
    }).catch(error => {
        res.status(400).json({message: "There is an error!"});
    })
}

const deleteSong = (req, res) => {
    const song_id = req.params.song_id;
    Song.destroy({where: {song_id: song_id}}).then(song => {
        res.status(200).json({message: "Song deleted!"});
    }).catch(error => {
        res.status(400).json({message: "There is an error!"});
    })
}

// get Song by penyanyi_id
const getSongByPenyanyiId = (req, res) => {
    const penyanyi_id = req.params.penyanyi_id;
    Song.findAll({where: {penyanyi_id: penyanyi_id}}).then(songs => {
        if (!songs) {
            return res.status(404).send({message: "Songs not found!"});
        }
        res.status(200).json(songs);
    }).catch(error => {
        res.status(400).json({message: "There is an error!"});
    })
}

module.exports = {
    createSong,
    getAllSongs,
    getSongById,
    updateSong,
    deleteSong,
    getSongByPenyanyiId,
}
