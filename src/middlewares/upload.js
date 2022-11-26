const multer = require('multer');
const fs = require('fs');
const util = require("util");

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
    destination: function (req, file, cb) {
        cb(null,  __basedir + '/uploads')
    },
});

const upload = multer({ storage: storage }).single("audio_path");
let uploadFileMiddleware = util.promisify(upload);

module.exports = uploadFileMiddleware;