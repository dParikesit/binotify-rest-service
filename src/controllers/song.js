const fs = require('fs');
const Song = require('../models').Song;
const uploadFile = require("../middlewares/upload");

const createSong = async (req, res) => {
    const data = req.body;
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

    } catch (error) {
        res.status(400).json({message: "Error: " + error});
    }

    Song.create({
        song_id: data.song_id,
        judul: data.judul,
        penyanyi_id: data.penyanyi_id,
        audio_path: req.file.filename,
    }).then(song => {
        res.status(201).json({message: "Song created!"});
    }).catch(error => {
        res.status(400).json({message: "Error: " + error});
    })
}

const getAllSongs = (req, res) => {
    Song.findAll().then(songs => {
        res.status(200).json(songs);
    }).catch(error => {
        res.status(400).json({message: "Error: " + error});
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
        res.status(400).json({message: "Error: " + error});
    })
}

const updateSong = async (req, res) => {
    const song_id = req.params.song_id;
    const data = req.body;

    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

    } catch (error) {
        res.status(400).json({message: "Error: " + error});
    }

    Song.update({
        judul: data.judul,
        audio_path: req.file.filename,
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
        res.status(400).json({message: "Error: " + error});
    })
}

// get Song by penyanyi_id
const getSongByPenyanyiId = (req, res) => {
    const penyanyi_id = req.params.penyanyi_id;
    const song_id = req.params.song_id;
    Song.findOne({where: {penyanyi_id: penyanyi_id, song_id: song_id}}).then(song => {
        if (!song) {
            return res.status(404).send({message: "Song not found!"});
        }
        res.status(200).json(song);
    }).catch(error => {
        res.status(400).json({message: "Error: " + error});
    })
}

// get Songs by penyanyi_id
const getSongsByPenyanyiId = (req, res) => {
    const penyanyi_id = req.params.penyanyi_id;
    Song.findAll({where: {penyanyi_id: penyanyi_id}}).then(songs => {
        if (!songs) {
            return res.status(404).send({message: "Songs not found!"});
        }
        res.status(200).json(songs);
    }).catch(error => {
        res.status(400).json({message: "Error: " + error});
    })
}

// stream song in uploads
const listenSong = (req, res) => {
    const song_id = req.params.song_id;
    Song.findByPk(song_id).then(song => {
        if (!song) {
            return res.status(404).send({message: "Song not found!"});
        }
        const path = __basedir + "/uploads/" + song.audio_path;
        const stat = fs.statSync(path);

        res.writeHead(200, {
            'Content-Type': 'audio/wav',
            'Content-Length': stat.size
        });

        const readStream = fs.createReadStream(path);
        readStream.pipe(res);
    }).catch(error => {
        res.status(400).json({message: "Error: " + error});
    })
}


module.exports = {
    createSong,
    getAllSongs,
    getSongById,
    updateSong,
    deleteSong,
    getSongByPenyanyiId,
    getSongsByPenyanyiId,
    listenSong
}
