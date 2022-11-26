const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(username, isAdmin) {
    return jwt.sign({username: username, isAdmin:isAdmin}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
        req.user = decoded;
        next()
    });
}

module.exports = {
    generateAccessToken,
    authenticateToken
}