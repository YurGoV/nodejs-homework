const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    uploadAvatar
} = require('../../Controllers/userController');
const {authUserValidation} = require("../../middlewars/usersValidation");
const {authMiddleware} = require("../../middlewars/authMiddleware");
const {uploadAvatarMiddleware} = require("../../middlewars/uploadAvatarMiddleware");


router.post('/register', authUserValidation, createUser);
router.get('/login', authUserValidation, loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/current', authMiddleware, getCurrentUser);
router.patch('/avatars',
    [authMiddleware, uploadAvatarMiddleware.single('avatar')],
    uploadAvatar);

module.exports = router;