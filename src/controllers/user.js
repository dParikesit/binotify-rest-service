const User = require('../models').User;
const bcrypt = require('bcrypt');
const { json } = require('sequelize');
const redis = require("redis");

let redisClient;

(async () => {
    redisClient = redis.createClient({
        url: 'redis://redis/'
    });

    redisClient.on("error", function (err) {
        console.log("Error " + err)
        redisClient.del("listpenyanyi", function(err, reply){
            console.log("Deleted cache list penyanyi :" + reply);
        });
    });

    await redisClient.connect();
})();

const createUser = async(req, res) => {
    let data = req.body;
    // check if the user already exists

    try {
        let user = await User.findOne({ where: { email: data.email } });
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        user = await User.findOne({ where: { username: data.username } });
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        if (data.password !== data.confirm_password) {
            return res.status(400).json({
                message: 'Password does not match'
            });
        }

        // hash password
        bcrypt.hash(data.password, 10, (err, hash) => {
            if (err) {
                return res.status(400).json({
                    message: 'Error: ' + err
                });
            }

            User.create({
                email: data.email,
                password: hash,
                username: data.username,
                name: data.name,
                isAdmin: false
            })
                .then((user) => {
                    redisClient.del('listpenyanyi', function (err, reply) {
                        console.log('Deleted cache list penyanyi :' + reply);
                    });
                    return res.status(201).json({ message: 'User created!', user: user });
                })
                .catch((error) => {
                    return res.status(400).json({ message: 'Error: ' + error });
                });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error: ' + error });
    }
}

const getByUsername = (req, res) => {
    const username = req.body.username;
    User.findOne({where: {username: username}})
    .then(user => {
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({message: "User not found!"});
        }
    }).catch(error => {
        return res.status(400).json({message: "Error: " + error});
    })
}

const getById = (req, res) => {
    const id = req.params.id;
    User.findByPk(id).then(user => {
        if (!user) {
            return res.status(404).send({message: "User not found!"});
        }
        return res.status(200).json(user);
    }).catch(error => {
        return res.status(400).json({message: "Error: " + error});
    })
}

const findAll = async (req, res) => {
    // get all users isAdmin = false
    const cacheResults = await redisClient.get('listpenyanyi');
    if (cacheResults) {
        results = JSON.parse(cacheResults);
        return res.status(200).send({
            fromCache: true,
            data: results
        })
    } else {
        User.findAll({where: {isAdmin: false}})
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "Users not found!"
                });
            };
            let userList = users.map(user => {
                return {
                    creator_id: user.id,
                    username: user.username,
                    name: user.name,
                };
            })
            redisClient.set('listpenyanyi', JSON.stringify(userList))
            return res.status(200).send({
                fromCache: false,
                data: userList
            });
        })
        .catch(error => {
            return res.status(400).json({message: "Error: " + error});
        })
    }
}

module.exports = {
    createUser,
    getByUsername,
    getById,
    findAll,
}