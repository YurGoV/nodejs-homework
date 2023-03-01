const jwt = require('jsonwebtoken');
const {User} = require("../db/usersModel");
const JWT_SECRET = process.env.JWT_SECRET;


const authMiddleware = async (req, res, next) => {
    // token?
    try {
        // console.log('req.headers in aMiddleware', req.headers);
        if (!req.headers.authorization) {
            return res.status(400).json({"message": "Please, provide a token"})
        }
        const [, token] = req.headers.authorization.split(' ');
        console.log('token in authMiddleware: :', token);


        const tokenVerify = jwt.verify(token, JWT_SECRET);
        const tokenUser = tokenVerify.email;
        const dbUser = await User.findOne({email: tokenUser})
        if (!dbUser) {
            return res.status(401).json({"message": "Not authorized"})
        }

        console.log('dbUser token', dbUser.token);
        if (dbUser.token !== token) {
                return res.status(401).json({"message": "Not authorized"})
        }

        req.user = tokenUser;
        req.token = token;

        next();

    } catch(err) {
        console.log('err.messages in auth Middleware', err);
        // return err.messages
        return res.status(401).json({"message": "Not authorized"})
        // next();
    }
}

module.exports = {
    authMiddleware,
}
