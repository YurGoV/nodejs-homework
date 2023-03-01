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

const findValidUser = async (email, password) => {
    try {
        console.log('email in Services/users', email);
        // return User.find(email);
        const searchUserResult = await User.findOne({ email });

        if (!searchUserResult) {
            return null;
        }
        const isPassportValid = await bcrypt.compare(password, searchUserResult.password);
        console.log('isPassportValid :', isPassportValid);
        if (!isPassportValid) {
            return null;
        }
        // console.log('ttt: ', ttt);
        return searchUserResult;
    } catch (err) {
        console.log('in Services/users err: ', err.index, err.code, err.keyPattern, err.keyValue);
        return err;
    }
}

module.exports = {
    registerUser,
    findValidUser,
}
