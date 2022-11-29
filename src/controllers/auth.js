const bcrypt = require('bcrypt');
const User = require('../models').User;
const { generateAccessToken } = require('../middlewares/jwt');

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username }});
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'Error: ' + err });
        }
        if (result) {
            const accessToken = generateAccessToken({ username: user.username, isAdmin: user.isAdmin });
            return res.status(200).json({ message: 'Login successful', accessToken: accessToken, isAdmin: user.isAdmin, id: user.id, username: user.username });
        }
        return res.status(400).send({ message: 'Password does not match' });
    });
}

module.exports = {
    login
}