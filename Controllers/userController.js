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

        // const {user, subscription} = req;
        console.log('uplAvatar', req.body);

        return res.status(200).json({
            "status": "success"
        })

        /* return res.status(200).json({
            "email": user,
            "subscription": subscription
        }) */

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