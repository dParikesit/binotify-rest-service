const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(username, isAdmin) {
    return jwt.sign({username: username, isAdmin:isAdmin}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
            console.log(err);
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            next()
        });
    }

    if (!token) return res.status(403).send({ auth: false, message: 'Not authorized.' });
}

module.exports = {
    generateAccessToken,
    authenticateToken
}