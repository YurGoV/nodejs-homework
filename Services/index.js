const {
    registerUserServ,
    findValidUserServ,
    verifyUserServ,
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
    verifyUserServ,
};
