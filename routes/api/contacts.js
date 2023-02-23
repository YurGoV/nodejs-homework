const express = require('express');
const router = express.Router();

const {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    putContact,
    updateFavoriteContact,
} = require('../../models/controllers/postController');

const {addPostValidation, updatePostValidation, updateFavoriteValidation}  = require('../../middlewars/postsValitation');



router.get('/', getContacts )

router.get('/:contactId', getContactById )

router.post('/', addPostValidation, addContact)

router.delete('/:contactId', deleteContact )

router.put('/:contactId', updatePostValidation, putContact )

router.patch('/:contactId/favorite/', updateFavoriteValidation, updateFavoriteContact)

module.exports = router
