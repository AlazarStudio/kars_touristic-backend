import FaqService from "./FaqService.js"

class FaqController {
    async faq(req, res) {
        try {
            const { question, answer} = req.query;

            const faq = await FaqService.transfer({
                question,
                answer,
            });

            res.status(201).send(faq);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };
}

export default new FaqController();
