const {User} = require('../db/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async ({email, password}) => {


    try {
        console.log('in Services/users: ', email, password);
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword);
        return User.create({email, password: encryptedPassword});
    } catch (err) {
        console.log('in Services/users err: ', err.index, err.code, err.keyPattern, err.keyValue);
        return err;
    }
}


module.exports = {
    registerUser,
}
