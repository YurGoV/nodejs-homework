const {User} = require('../db/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const {v4: uuidv4} = require('uuid');
const sgMail = require('@sendgrid/mail');

const sendMail = async (email, verificationToken) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    console.log('process.env.SENDGRID_API_KEY', process.env.SENDGRID_API_KEY);// todo: delete
    const msg = {
        to: email, // Change to your recipient
        from: 'yurgov@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'please open in browser, that support html messages view',
        html: '<h3>Please complete registration: confirm you email </h3>' +
            `<h4><a href="http://localhost:3000/api/users/verify/${verificationToken}">by click on this link</a></h4>`,
    }
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }
};

const JWT_SECRET = process.env.JWT_SECRET;

const generateAvatar = async (email) => {
    try {
        return await gravatar.url(email, {protocol: 'http', s: '100'});
    } catch (err) {
        console.log(err.message);
        return '';
    }
};


const registerUserServ = async ({email, password}) => {

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const verificationToken = uuidv4();

        const gravatarUrl = await generateAvatar(email);

        const createdUser = User.create({
            email: email,
            password: encryptedPassword,
            avatarURL: gravatarUrl,
            verificationToken: verificationToken,
        });

        console.log('email, verificationToken', email, verificationToken);// todo: delete

        await sendMail(email, verificationToken);

        return createdUser;

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
        const isPassportValid = await bcrypt.compare(password, searchUserResult.password);// todo: destructurization
        if (!isPassportValid) {
            return null;
        }
        console.log('searchUserResult in services/users :', searchUserResult);// todo: delete

        const payload = {email: email, subscription: searchUserResult.subscription, verify: searchUserResult.verify}// todo: destructurization
        const token = jwt.sign(payload, JWT_SECRET);

        if (searchUserResult.verify) {
            await User.findOneAndUpdate({email: email}, {token: token})
        }

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
