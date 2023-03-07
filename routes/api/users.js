const express = require('express');
const router = express.Router();
const {
    createUserContr,
    loginUserContr,
    logoutUserContr,
    getCurrentUserContr,
    uploadAvatarContr
} = require('../../Controllers');


const {
    authUserValidationMwr,
    authMwr,
    uploadAvatarMwr
} = require("../../middlewars");


router.post('/register', authUserValidationMwr, createUserContr);
router.get('/login', authUserValidationMwr, loginUserContr);
router.post('/logout', authMwr, logoutUserContr);
router.get('/current', authMwr, getCurrentUserContr);
router.patch('/avatars',
    [authMwr, uploadAvatarMwr.single('avatar')],
    uploadAvatarContr);

module.exports = router;