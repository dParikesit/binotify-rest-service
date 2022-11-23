const bcrypt = require('bcrypt');
const User = require('../models').User;

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username
    }});
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    // compare password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'There is an error!' + err });
        }
        if (result) {
            return res.status(200).send({ message: 'Login successful' });
        }
        return res.status(400).send({ message: 'Password does not match' });
    });
}

module.exports = {
    login
}