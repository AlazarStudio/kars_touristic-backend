import Faq from "./Faq.js";

class FaqService {
    async transfer(transferData) {
        const { question, answer} = transferData;

        const faq = new Faq({
            question,
            answer
        });

        return await faq.save();
    }
}


export default new FaqService();
