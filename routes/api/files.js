const express = require('express');
// const multer = require('multer');
// const { v4: uuid } = require('uuid');
const path = require('path');

const router = new express.Router();

const FILE_DIR =  path.resolve('./public/avatars');// todo paths in .env
// console.log(FILE_DIR);

/* const {
    uploadController,
} = require('../../Controllers/filesController');


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

const uploadMiddleware = multer({storage});// todo: move to middlewares

// POST /api/avatars/upload
// router.patch('/upload', uploadMiddleware.single('avatar'), uploadController);
router.patch('/', uploadMiddleware.single('avatar'), uploadController); */

router.use('/', express.static(FILE_DIR));



module.exports = router;
