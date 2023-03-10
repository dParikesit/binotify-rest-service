const fs = require('fs');
const path = require('path');
const Song = require('../models').Song;
const uploadFile = require('../middlewares/upload');

const createSong = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (!req.file) {
            return res.status(400).send({ message: 'Please upload a file!' });
        }
        req.body.path = 'http://localhost:3002/static/' + req.file.filename;
    } catch (error) {
        return res.status(400).send({ message: 'Error: ' + error });
    }

    Song.create({
        judul: req.body.judul,
        penyanyi_id: req.body.penyanyi_id,
        audio_path: req.body.path
    })
        .then((song) => {
            return res.status(201).json({ message: 'Song created!' });
        })
        .catch((error) => {
            return res.status(400).json({ message: 'Error: ' + error });
        });
};

const getAllSongs = (req, res) => {
    Song.findAll()
        .then((songs) => {
            return res.status(200).json(songs);
        })
        .catch((error) => {
            return res.status(400).json({ message: 'Error: ' + error });
        });
};

const getSongById = (req, res) => {
    const song_id = req.params.song_id;
    Song.findByPk(song_id)
        .then((song) => {
            if (!song) {
                return res.status(404).send({ message: 'Song not found!' });
            }
            return res.status(200).json(song);
        })
        .catch((error) => {
            return res.status(400).json({ message: 'Error: ' + error });
        });
};

const updateSong = async (req, res) => {
    const song_id = req.params.song_id;
    try {
        let judul = '';
        let audio_path = '';
        await Song.findOne({ where: { song_id: song_id } })
            .then((song) => {
                judul = song.judul;
                audio_path = song.audio_path;
                if (req.body.judul === '') {
                    req.body.judul = judul;
                }
            })
            .catch((error) => {
                return res.status(400).json({ message: 'Song is not found' });
            });

        await uploadFile(req, res);
        if (!req.file) {
            req.body.path = audio_path;
        } else {
            req.body.path = 'http://localhost:3002/static/' + req.file.filename;
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error: ' + error });
    }
    Song.update(
        {
            judul: req.body.judul,
            audio_path: req.body.path
        },
        { where: { song_id: song_id } }
    )
        .then((song) => {
            return res.status(200).json({ message: 'Song updated!' });
        })
        .catch((error) => {
            return res.status(400).json({ message: 'Error: ' + error });
        });
};

const deleteSong = (req, res) => {
    const song_id = req.params.song_id;

    Song.findOne({ where: { song_id: song_id } })
        .then((song) => {
            pathUrl = song.audio_path;
            pathArr = pathUrl.split('/');
            audioName = pathArr[pathArr.length - 1];

            fs.unlinkSync("/app/uploads/"+audioName, (err) => {
                if (err) {
                    console.log('oops');
                }
            });

            Song.destroy({ where: { song_id: song_id } })
                .then((song) => {
                    return res.status(200).json({ message: 'Song deleted!' });
                })
                .catch((error) => {
                    return res.status(400).json({ message: 'Error: ' + error });
                })
        })
        .catch((error) => {
            return res.status(400).json({ message: JSON.stringify(error) });
        });
    
};

// get Song by penyanyi_id
const getSongByPenyanyiId = (req, res) => {
    const penyanyi_id = req.params.penyanyi_id;
    const song_id = req.params.song_id;
    Song.findOne({ where: { penyanyi_id: penyanyi_id, song_id: song_id } })
        .then((song) => {
            if (!song) {
                return res.status(404).send({ message: 'Song not found!' });
            }
            return res.status(200).json(song);
        })
        .catch((error) => {
            return res.status(400).json({ message: 'Error: ' + error });
        });
};

// get Songs by penyanyi_id
const getSongsByPenyanyiId = (req, res) => {
    const penyanyi_id = req.params.penyanyi_id;
    Song.findAll({ where: { penyanyi_id: penyanyi_id } })
        .then((songs) => {
            if (!songs) {
                return res.status(404).send({ message: 'Songs not found!' });
            }
            return res.status(200).json(songs);
        })
        .catch((error) => {
            return res.status(400).json({ message: 'Error: ' + error });
        });
};

module.exports = {
    createSong,
    getAllSongs,
    getSongById,
    updateSong,
    deleteSong,
    getSongByPenyanyiId,
    getSongsByPenyanyiId
};
