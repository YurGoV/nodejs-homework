const fs = require('fs/promises')

const {Contacts} = require('../db/contactsModel')


const listContacts = async () => {
    const data = await Contacts.find({})
    return data
}

const listContactById = async (contactId) => {
    const data = await Contacts.findById(contactId)
    return data
}

const postContact = async (body) => {
    // const contact = new Contacts(body);
    // const newContact = await contact.save()
    return Contacts.create(body)
    // return newContact // todo: ??? what to return?
}

const removeContact = async (contactId) => {
    const contact = await Contacts.findByIdAndRemove(contactId)
    // console.log('cc', contact);
    if (!contact) {
        return {"message": "Not found"};
    }
    return {"message": "contact deleted"};
}


const updateContact = async (contactId, body) => {
    try {// todo add try/catch to other funcs
        // const updatedContact = await Contacts.update({_id: contactId}, body);
        return  Contacts.update({_id: contactId}, body);
        // return updatedContact;
    } catch (err) {
        return err;
    }
}

const updateFavorite = async (contactId, body) => {
    try {// todo add try/catch to other funcs
        console.log(contactId, body);
        return Contacts.update({_id: contactId}, body);
        // return updatedFavoriteContact;
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
