const {
    registerUserServ,
    findValidUserServ,
} = require('./users');

const {
    listContactsServ,
    listContactByIdServ,
    postContactServ,
    removeContactServ,
    updateContactServ,
    updateFavoriteServ,
    countContactsServ,
} = require('./contacts');

module.exports = {
    registerUserServ,
    findValidUserServ,
    listContactsServ,
    listContactByIdServ,
    postContactServ,
    removeContactServ,
    updateContactServ,
    updateFavoriteServ,
    countContactsServ,
};