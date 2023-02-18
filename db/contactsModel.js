// MONGO START
const mongoose = require('mongoose')
// mongodb+srv://user:UserPass123@cluster0.luc0jve.mongodb.net/?retryWrites=true&w=majority



const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

const Contacts = mongoose.model('Contact', contactsSchema) // // 'Contact' - назва колекції (в базі вона буде з маленької та у множині

module.exports = {
    Contacts
}