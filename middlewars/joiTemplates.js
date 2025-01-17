const Joi = require('joi');

const name = Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я0-9іІїЇєЄґҐ']{3,20}$/);
const email = Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ua', 'org', 'net']}});
const phone = Joi.string()
    .pattern(/^[+0-9]{13}$/);
const password = Joi.string()
    .pattern(/^[a-zA-Z0-9.;,/.;'`)(*&^%$#@!~]{3,30}$/);
const verificationToken = Joi.string().guid({version: 'uuidv4'});

module.exports = {
    name,
    email,
    phone,
    password,
    verificationToken,
}