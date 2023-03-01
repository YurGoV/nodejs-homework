const express = require('express');
const router = express.Router();

const {createUser} = require('../../Controllers/userController');
const {addUserValidation} = require("../../middlewars/usersValidation");



router.post('/register', addUserValidation, createUser);

module.exports = router;