const {Contacts} = require('../db/contactsModel');

const countContacts = async (owner, favoriteArr) => {
    try {
        return await Contacts.countDocuments({owner: owner, favorite: favoriteArr})
    } catch (err) {
        return err.message;
    }
}

const listContacts = async (owner, favoriteArr, {skip, limit}) => {
    try {
        const data = await Contacts.find({owner: owner, favorite: favoriteArr})
            .select({__v: 0, owner: 0})
            .skip(skip)
            .limit(limit);
        return data
    } catch (err) {
        return err.message;
    }
}

const listContactById = async (contactId, owner) => {
    try {
        const data = await Contacts.findOne({_id: contactId, owner: owner})
        return data
    } catch (err) {
        return err.message;
    }
}

const postContact = async (body) => {
    try {
        return Contacts.create(body)
    } catch (err) {
        return err.message;
    }
}

const removeContact = async (contactId, owner) => {
    try {
        const contact = await Contacts.findOneAndRemove({_id: contactId, owner: owner});
        if (!contact) {
            return {"message": "Not found"};
        }
        return {"message": "contact deleted"};
    } catch (err) {
        return err.message;
    }
}

const updateContact = async (contactId, owner, body) => {
    try {
        return Contacts.updateOne({_id: contactId, owner: owner}, body);
    } catch (err) {
        return err.message;
    }
}

const updateFavorite = async (contactId, owner, body) => {
    try {
        return Contacts.updateOne({_id: contactId, owner: owner}, body);
    } catch (err) {
        return err.message;
    }
}


module.exports = {
    listContacts,
    listContactById,
    postContact,
    removeContact,
    updateContact,
    updateFavorite,
    countContacts,
}
