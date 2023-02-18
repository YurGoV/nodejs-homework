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
    const contact = new Contacts(body);
    await contact.save()
    return body // todo: ??? what to return?
}

const removeContact = async (contactId) => {
    const contact = await Contacts.findByIdAndRemove(contactId)
    // console.log('cc', contact);
    if (!contact) {
        return {"message": "Not found"};
    }
    return {"message": "contact deleted", "deleted contact": contact};
}


const updateContact = async (contactId, body) => {
    try {
        const oldContacts = await listContacts();
        const isContact = oldContacts.find(item => item.id === contactId);// todo: find?
        console.log('isContact: ', isContact);
        let newContact = null;
        const newContacts = await oldContacts.map(contact => {
            if (contact.id === contactId) {
                newContact = {...contact, ...body};
                return newContact
            }
            return contact
        })

        console.log(newContacts);

        if (newContact) {
            console.log('yahooo');
            await fs.writeFile('./models/contacts.json', JSON.stringify(newContacts), 'utf-8')
            return newContact;

        } else {
            return null
        }
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
}
