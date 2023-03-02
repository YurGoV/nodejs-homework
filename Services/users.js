const {User} = require('../db/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async ({email, password}) => {

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        return User.create({email, password: encryptedPassword});
    } catch (err) {
        return err.message;
    }
}

const findValidUser = async (email, password) => {
    try {
        const searchUserResult = await User.findOne({email});

        if (!searchUserResult) {
            return null;
        }
        const isPassportValid = await bcrypt.compare(password, searchUserResult.password);
        if (!isPassportValid) {
            return null;
        }

        const payload = {email, subscription: searchUserResult.subscription}
        const token = jwt.sign(payload, JWT_SECRET);

        await User.findOneAndUpdate(email, {token: token})

        return {
            "token": token,
            "user": payload,
        };

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    registerUser,
    findValidUser,
}
