const User = require('../models').User;
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
    let data = req.body;
    // check if the user already exists
    User.findOne({where: {email: data.email}}).then(user => {
        if (user) {
            return res.status(400).send({
                message: 'User already exists'
            });
        }
    })

    if (data.password !== data.confirm_password) {
        return res.status(400).send({
            message: 'Password does not match'
        });
    }

    // hash password
    bcrypt.hash(data.password, 10, (err, hash) => {
        if (err) {
            return res.status(400).send({
                message: 'Error: ' + err
            });
        }

        User.create({
            email: data.email,
            password: hash,
            username: data.username,
            name: data.name,
            isAdmin: false,
        }).then(user => {
            res.status(201).json({message: "User created!"});
        }).catch(error => {
            res.status(400).json({message: "Error: " + error});
        })
    });
}

const getByUsername = (req, res) => {
    const username = req.body.username;
    User.findOne({where: {username: username}})
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "User not found!"});
        }
    }).catch(error => {
        res.status(400).json({message: "Error: " + error});
    })
}

const getById = (req, res) => {
    const id = req.params.id;
    User.findByPk(id).then(user => {
        if (!user) {
            return res.status(404).send({message: "User not found!"});
        }
        res.status(200).json(user);
    }).catch(error => {
        res.status(400).json({message: "Error: " + error});
    })
}

const findAll = (req, res) => {
    // get all users isAdmin = false
    User.findAll({where: {isAdmin: false}})
    .then(users => {
        if (!users) {
            return res.status(404).send({message: "Users not found!"});
        }
        res.status(200).json(users);
    }).catch(error => {
        res.status(400).json({message: "Error: " + error});
    })
}

module.exports = {
    createUser,
    getByUsername,
    getById,
    findAll,
}