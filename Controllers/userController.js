const fs = require('fs').promises;
const Jimp = require("jimp");
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT;
const AVATAR_TEMP_DIR_ENV = process.env.AVATAR_TEMP_DIR_ENV;
const AVATAR_CONST_DIR_ENV = process.env.AVATAR_CONST_DIR_ENV;
const AVATAR_TEMP_DIR = path.resolve(AVATAR_TEMP_DIR_ENV);
const AVATAR_CONST_DIR = path.resolve(AVATAR_CONST_DIR_ENV)

const {registerUser, findValidUser} = require('../Services/users');
const {User} = require("../db/usersModel");


const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const createdUser = await registerUser(userData);

        res.status(201).json({
            "user": {
                "email": `${createdUser.email}`,
                "subscription": `${createdUser.subscription}`
            }
        })

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({"message": "Email in use"})
        }
        res.status(500).json(err.message)
    }
};

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const searchUserResult = await findValidUser(email, password);
        if (!searchUserResult) {
            return res.status(401).json({
                "message": "Email or password is wrong"
            })
        }

        return res.status(200).json(searchUserResult)

    } catch (err) {
        res.status(500).json(err.message)
    }
};

const logoutUser = async (req, res, next) => {
    try {

        await User.findOneAndUpdate({email: req.user}, {token: ""})

        return res.status(204).json({})

    } catch (err) {
        res.status(500).json(err.message)
    }
};

const getCurrentUser = async (req, res, next) => {
    try {

        const {user, subscription} = req;

        return res.status(200).json({
            "email": user,
            "subscription": subscription
        })

    } catch (err) {
        res.status(500).json(err.message)
    }
};

const uploadAvatar = async (req, res, next) => {
    try {
        const {user, uniqueFileName} = req;
        const avatarTempUrl = path.resolve(AVATAR_TEMP_DIR, uniqueFileName);
        const avatarConstUrl = path.resolve(AVATAR_CONST_DIR, uniqueFileName);
        const avatarDownloadUrl = `http://localhost:${PORT}/api/avatars/${uniqueFileName}`

        const image = await Jimp.read(avatarTempUrl);
        image.resize = await image.resize(250, Jimp.AUTO);
        await image.writeAsync(avatarConstUrl);

        await fs.unlink(avatarTempUrl);

        await User.findOneAndUpdate({email: user}, {avatarURL: avatarDownloadUrl})

        return res.status(200).json({
            "avatarURL": avatarConstUrl
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    uploadAvatar,
}