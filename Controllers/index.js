const {
    getContactsContr,
    getContactByIdContr,
    addContactContr,
    deleteContactContr,
    patchContactContr,
    updateFavoriteContactContr,
} = require('./contactsController');

const {
    createUserContr,
    loginUserContr,
    logoutUserContr,
    getCurrentUserContr,
    uploadAvatarContr,
    verifyUserContr,
} = require('./userController');

module.exports = {
    getContactsContr,
    getContactByIdContr,
    addContactContr,
    deleteContactContr,
    patchContactContr,
    updateFavoriteContactContr,
    createUserContr,
    loginUserContr,
    logoutUserContr,
    getCurrentUserContr,
    uploadAvatarContr,
    verifyUserContr,
}
