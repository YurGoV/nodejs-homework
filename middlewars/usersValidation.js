const Joi = require('joi');

const userSchema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ua', 'org', 'net']}})
            .required(),
        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{3,30}$/)
            .required(),

    }
);

// token: Joi.string()
// .required(),
// subscription: Joi.any().valid('starter', 'pro', 'business')
// .required(),

module.exports = {
    authUserValidation: (req, res, next) => {
        const validationResult = userSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({error: validationResult.error.message})
        }
        next();
    },

}