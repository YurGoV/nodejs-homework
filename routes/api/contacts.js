const express = require('express');
const router = express.Router();

const {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    patchContact,
    updateFavoriteContact,
} = require('../../Controllers/contactsController');

const {
    addPostValidation,
    updatePostValidation,
    updateFavoriteValidation
} = require('../../middlewars/postsValitation');

const {authMiddleware} = require("../../middlewars/authMiddleware");
router.use(authMiddleware);


router.get('/', getContacts);

router.get('/:contactId', getContactById);

router.post('/', addPostValidation, addContact);

router.delete('/:contactId', deleteContact);

router.patch('/:contactId', updatePostValidation, patchContact);

router.patch('/:contactId/favorite/', updateFavoriteValidation, updateFavoriteContact);

module.exports = router;
