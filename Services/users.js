const {User} = require('../db/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const {v4: uuidv4} = require('uuid');


const JWT_SECRET = process.env.JWT_SECRET;

const generateAvatar = async (email) => {
    try {
        return await gravatar.url(email, {protocol: 'http', s: '100'});
    } catch (err) {
        console.log(err.message);
        return '';
    }
}

const registerUserServ = async ({email, password}) => {

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const verificationToken = uuidv4();

        const gravatarUrl = await generateAvatar(email);

        return User.create({
            email: email,
            password: encryptedPassword,
            avatarURL: gravatarUrl,
            verificationToken: verificationToken,
        });

    } catch (err) {
        return err.message;
    }
}

const findValidUserServ = async (email, password) => {
    try {
        const searchUserResult = await User.findOne({email: email});

        if (!searchUserResult) {
            return null;
        }
        const isPassportValid = await bcrypt.compare(password, searchUserResult.password);
        if (!isPassportValid) {
            return null;
        }

        const payload = {email: email, subscription: searchUserResult.subscription}
        const token = jwt.sign(payload, JWT_SECRET);

        await User.findOneAndUpdate({email: email}, {token: token})

        return {
            "token": token,
            "user": payload,
        };

    } catch (err) {
        console.log(err.message);
    }
};

const verifyUserServ = async (verificationToken) => {
    try {
        const searchTokenResult = await User.findOne({verificationToken: verificationToken});

        if (searchTokenResult) {
            const email = await searchTokenResult.email;
            await User.findOneAndUpdate({email: email}, {verificationToken: null, verify: true})

            return {
                statusCode: 200
            };
        }

        return {
            statusCode: 404
        };

    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    registerUserServ,
    findValidUserServ,
    verifyUserServ,
}
