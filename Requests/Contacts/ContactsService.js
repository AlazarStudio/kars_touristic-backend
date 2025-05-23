import Contacts from "./Contacts.js";

class ContactsService {
  async contacts(contactsData) {
    const { adress, phone, email, imgPath  } = contactsData;
    const imgPathName = Array.isArray(imgPath)
    ? imgPath.map((file) => file.filename)
    : [imgPath?.filename].filter(Boolean);
    try {
      const updatedContacts = await Contacts.findOneAndUpdate(
        {},
        { adress, phone, email, images: imgPathName },
        { new: true, upsert: true }
      );
      return updatedContacts;
    } catch (error) {
      throw new Error("Error updating contacts: " + error.message);
    }
  }

  async getContacts() {
    try {
      const contacts = await Contacts.findOne({});
      return contacts;
    } catch (error) {
      throw new Error("Error getting aboutCompany: " + error.message);
    }
  }
}

export default new ContactsService();
