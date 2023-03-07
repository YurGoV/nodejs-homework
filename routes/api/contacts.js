const express = require('express');
const router = express.Router();

const {
    getContactsContr,
    getContactByIdContr,
    addContactContr,
    deleteContactContr,
    patchContactContr,
    updateFavoriteContactContr,
} = require('../../Controllers');

const {
    addPostValidationMwr,
    updatePostValidationMwr,
    updateFavoriteValidationMwr,
    authMwr,
} = require('../../middlewars');

router.use(authMwr);


router.get('/', getContactsContr);

router.get('/:contactId', getContactByIdContr);

router.post('/', addPostValidationMwr, addContactContr);

router.delete('/:contactId', deleteContactContr);

router.patch('/:contactId', updatePostValidationMwr, patchContactContr);

router.patch('/:contactId/favorite/', updateFavoriteValidationMwr, updateFavoriteContactContr);

module.exports = router;
