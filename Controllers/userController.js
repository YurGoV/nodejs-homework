const {registerUser} = require('../Services/users');

const createUser = async (req, res, next) => {
    try {
        const contactData = req.body;
        const createdUser = await registerUser(contactData);
        // console.log('createdUser in userController', '/', createdUser.code, '/', Object.keys(createdUser));
        // console.log('createdUser in userController', createdUser);
        if (createdUser.code === 11000) {
            return res.status(409).json({"message": "Email in use"})
        }
        res.status(201).json({
            "user": {
                "email": `${createdUser.email}`,
                "subscription": `${createdUser.subscription}`
            }
        })
    } catch (err) {
        console.log('err in userController', err);
    }
}


module.exports = {
    createUser,
}