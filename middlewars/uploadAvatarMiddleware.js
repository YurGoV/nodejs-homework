const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');

const FILE_DIR =  path.resolve('./tmp');

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
        const uniqueFileName = `${filename}_${uuid()}.${extension}`;
        // const path = `http://localhost:3000/api/users/avatars/${uniqueFileName}`;
        req.avatarURL = `http://localhost:3000/api/avatars/${uniqueFileName}`
        // console.log(path);
        cb(null, `${uniqueFileName}`)
    }
});

const uploadAvatarMiddleware = multer({storage});// todo: move to middlewares


module.exports = {
    uploadAvatarMiddleware
}