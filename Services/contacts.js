const {Contacts} = require('../db/contactsModel');

const listContacts = async (owner) => {
    try {
        const data = await Contacts.find({owner})
        // const data = await Contacts.find({}).populate('owner')
        return data
    } catch (err) {
        return err;
    }
}

const listContactById = async (contactId, owner) => {
    try {
        const data = await Contacts.findOne({_id: contactId, owner})
        return data
    } catch (err) {
        return err;
    }
}

const postContact = async (body) => {
    try {
        return Contacts.create(body)
    } catch (err) {
        return err;
    }
}

const removeContact = async (contactId, owner) => {
    try {
        const contact = await Contacts.findOneAndRemove({_id: contactId, owner});
        if (!contact) {
            return {"message": "Not found"};
        }
        return {"message": "contact deleted"};
    } catch (err) {
        return err;
    }
}

const updateContact = async (contactId, owner, body) => {
    try {
        return Contacts.updateOne({_id: contactId, owner}, body);
    } catch (err) {
        return err;
    }
}

const updateFavorite = async (contactId, owner, body) => {
    try {
        return Contacts.updateOne({_id: contactId, owner}, body);
    } catch (err) {
        return err;
    }
}


module.exports = {
    listContacts,
    listContactById,
    postContact,
    removeContact,
    updateContact,
    updateFavorite,
}
