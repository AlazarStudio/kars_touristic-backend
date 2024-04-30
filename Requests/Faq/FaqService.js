import Faq from "./Faq.js";

class FaqService {
    async faq(faqData) {
        const { question, answer} = faqData;

        const faq = new Faq({
            question,
            answer
        });

        return await faq.save();
    }
}


export default new FaqService();
