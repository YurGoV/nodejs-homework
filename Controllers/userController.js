const {registerUser, findValidUser} = require('../Services/users');
const {User} = require("../db/usersModel");

const createUser = async (req, res, next) => {
    try {
        const contactData = req.body;
        const createdUser = await registerUser(contactData);
        console.log('createdUser in userController', '/', createdUser.code, '/', Object.keys(createdUser));
        // console.log('createdUser in userController', createdUser);
        /* if (createdUser.code === 11000) {// todo: is necessary?
            return res.status(409).json({"message": "Email in use"})
        } */
        res.status(201).json({
            "user": {
                "email": `${createdUser.email}`,
                "subscription": `${createdUser.subscription}`
            }
        })
    } catch (err) {
        console.log('err in userController', err);
        if (err.code === 11000) {
            return res.status(409).json({"message": "Email in use"})
        }
    }
};

const loginUser = async (req, res, next) => {
    try {

        const {email, password} = req.body;
        console.log(email, password);

        const searchUserResult = await findValidUser(email, password)
        if (!searchUserResult) {
            return res.status(401).json({
                "message": "Email or password is wrong"
            })
        }
        // console.log('searchUserResult in userController : ', searchUserResult);

        return res.status(200).json(searchUserResult)


    } catch (err) {
        console.log('err in userController', err);
    }
};

const logoutUser = async (req, res, next) => {
    try {
        console.log('req.user in user Controller', req.user);

        await User.findOneAndUpdate({email: req.user}, {token: ""})

        return res.status(204).json({})


    } catch (err) {
        console.log('err in userController', err);
    }
};

const getCurrentUser = async (req, res, next) => {
    try {
        console.log('req.user in user Controller', req.user);
        console.log('req.token in user Controller', req.token);
        console.log('req.subscription in user Controller', req.subscription);
        // console.log(Object.keys(req));

        const {user, subscription} = req;

        // await User.findOneAndUpdate({email: req.user}, {token: ""})

        return res.status(200).json({
            "email": user,
            "subscription": subscription
        })


    } catch (err) {
        console.log('err in userController', err);
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
}