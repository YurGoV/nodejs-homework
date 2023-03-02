const express = require('express');
const router = express.Router();

const {createUser, loginUser, logoutUser, getCurrentUser} = require('../../Controllers/userController');
const {authUserValidation} = require("../../middlewars/usersValidation");
const {authMiddleware} = require("../../middlewars/authMiddleware");



router.post('/register', authUserValidation, createUser);
router.get('/login', authUserValidation, loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/current', authMiddleware, getCurrentUser);

module.exports = router;