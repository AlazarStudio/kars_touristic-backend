import Faq from "./Faq.js";

class FaqService {
  async faq(faqData) {
    const { question, answer } = faqData;

    const faq = new Faq({
      question,
      answer,
    });

    return await faq.save();
  }

  async getFaq() {
    try {
      const faq = await Faq.find();
      return faq;
    } catch (error) {
      throw new Error("Error getting Faq: " + error.message);
    }
  }

  async deleteFaq(id) {
    try {
      const deleteFaq = await Faq.findByIdAndDelete(id);

      return { message: "Успешно удален" };
    } catch (e) {
      return { message: e.message };
    }
  }
}

export default new FaqService();
