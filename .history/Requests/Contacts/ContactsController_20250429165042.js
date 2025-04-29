import ContactsService from "./ContactsService.js";

class ContactsController {
  async contacts(req, res) {
    try {
      const { adress, phone, email } = req.query;
      const imgPath = files.images.map((file) => file.filename);
      const data = {...body, imgPath}

      const contacts = await ContactsService.contacts({
        adress,
        phone,
        email,
        images
      });

      res.status(201).send(contacts);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }

  async getContacts(req, res) {
    try {
      const getContacts = await ContactsService.getContacts();
      res.status(200).send(getContacts);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось получить данные", error: error.message });
    }
  }
}

export default new ContactsController();
