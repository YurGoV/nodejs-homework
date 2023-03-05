const express = require('express');
const router = express.Router();

const {createUser, loginUser, logoutUser, getCurrentUser, uploadAvatar} = require('../../Controllers/userController');
const {authUserValidation} = require("../../middlewars/usersValidation");
const {authMiddleware} = require("../../middlewars/authMiddleware");
const {uploadAvatarMiddleware} = require("../../middlewars/uploadAvatarMiddleware");


const filesRouter = require('../../routes/api/files');


router.post('/register', authUserValidation, createUser);
router.get('/login', authUserValidation, loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/current', authMiddleware, getCurrentUser);
// router.patch('/avatars', authMiddleware, uploadAvatar);
router.patch('/avatars',
    [authMiddleware, uploadAvatarMiddleware.single('avatar')],
    uploadAvatar);
// router.patch('/avatars', filesRouter);

router.use('/avatars', express.static('./public/avatars'));


module.exports = router;