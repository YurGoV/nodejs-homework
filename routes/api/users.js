const express = require('express');
const router = express.Router();

const {createUser, loginUser} = require('../../Controllers/userController');
const {authUserValidation} = require("../../middlewars/usersValidation");



router.post('/register', authUserValidation, createUser);
router.get('/login', authUserValidation, loginUser);

module.exports = router;