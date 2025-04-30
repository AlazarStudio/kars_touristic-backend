import ContactsService from "./ContactsService.js";

class ContactsController {
  async contacts(req, res) {
    try {
    const { files, body } = req;
      const imgPath = files.images || [];
      const data = { ...body, imgPath };
      const contacts = await Conta.faqInfo(data);

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
