const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');

const FILE_DIR =  path.resolve('./public/avatars');

const {
    uploadController,
} = require('../Controllers/filesController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR)
    },
    filename: (req, file, cb) => {
        // console.log(file);
        const [filename, extension] = file.originalname.split('.');
        cb(null, `${filename}_${uuid()}.${extension}`)
    }
});

const uploadAvatarMiddleware = multer({storage});// todo: move to middlewares


module.exports = {
    uploadAvatarMiddleware
}