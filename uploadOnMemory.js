const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // generate a unique filename
    },

    fileFilter: (req, file, cb) => {


        if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
            cb(new Error('I don\'t have a clue!'), false);
            return;
        }
        cb(null, true)


    }
})