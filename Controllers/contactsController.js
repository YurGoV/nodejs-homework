const {
    listContacts,
    listContactById,
    postContact,
    removeContact,
    updateContact,
    updateFavorite,
    countContacts,
} = require("../Services/contacts");

const getContacts = async (req, res, next) => {
    const owner = req.userId;

    let {
        page = 1,
        limit = 5,
        favorite = [true, false],
    } = req.query;

    if (favorite !== 'true') {
        favorite = [true, false]
    } else {
        favorite = true;
    }

    const totalContacts = await countContacts(owner, favorite);

    limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
    const lastPage = Math.ceil(totalContacts / limit);
    page = parseInt(page) > lastPage ? lastPage : parseInt(page);

    let skip = 0;
    if (page > 1) {
        skip = (page - 1) * limit
    }

    const pagination = {
        totalContacts,
        page,
        perPage: limit,
    };

    const contacts = await listContacts(owner, favorite, {skip, limit});
    res.status(200).json({pagination, contacts, status: 'success'})
};

const getContactById = async (req, res, next) => {
    const id = req.params.contactId
    const owner = req.userId;
    const contact = await listContactById(id, owner)
    if (!contact) {
        return res.status(404).json({"message": "Not found"})
    }
    res.status(200).json(contact)
};

const addContact = async (req, res, next) => {

    req.body.owner = req.userId;
    const contact = req.body
    const result = await postContact(contact);
    res.status(201).json({result})
};

const deleteContact = async (req, res, next) => {
    const id = req.params.contactId;
    const owner = req.userId;
    const deleteResult = await removeContact(id, owner);
    if (deleteResult.statusCode === 404) {
        return res.status(404).json(deleteResult)
    }
    if (deleteResult.statusCode === 200) {
        return res.status(200).json(deleteResult)
    }
};

const patchContact = async (req, res, next) => {
    const id = req.params.contactId;
    const owner = req.userId;
    const body = req.body;
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({"message": "missing fields"})
    }

    const updatedContact = await updateContact(id, owner, body);

    if (updatedContact) {
        res.status(200).json({"message": updatedContact})
    } else {
        res.status(404).json({"message": "Not found"})
    }
};

const updateFavoriteContact = async (req, res, next) => {
    const {contactId} = req.params;
    const owner = req.userId;
    const body = req.body;

    const favoriteContact = await updateFavorite(contactId, owner, body)
    if (favoriteContact && favoriteContact.matchedCount === 1) {
        res.status(200).json(favoriteContact)
    } else {
        res.status(404).json({"message": "Not found"})
    }
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    patchContact,
    updateFavoriteContact,
}