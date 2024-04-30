import ContactsService from "./ContactsService.js"

class ContactsController {
    async contacts(req, res) {
        try {
            const { adress, phone, email } = req.query;

            const contacts = await ContactsService.contacts({
                adress,
                phone,
                email
            });

            res.status(201).send(contacts);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };
}

export default new ContactsController();
