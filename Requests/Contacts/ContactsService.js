import Contacts from "./Contacts.js";

class ContactsService {
    async contacts(contactsData) {
        const { adress, phone, email } = contactsData;

        const contacts = new Contacts({
            adress,
            phone,
            email
        });

        return await contacts.save();
    }
}


export default new ContactsService();
