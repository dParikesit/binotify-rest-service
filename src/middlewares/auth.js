function authenticateAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403).send({message: "You are not authorized to perform this action"});
    }
}

module.exports = {
    authenticateAdmin
}