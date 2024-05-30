import FaqService from "./FaqService.js"

class FaqController {
    async faq(req, res) {
        try {
            const { question, answer } = req.query;

            const faq = await FaqService.faq({
                question,
                answer,
            });

            res.status(201).send(faq);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };

    async getFaq(req, res) {
        try {
            const getFaq = await FaqService.getFaq();
            res.status(200).send(getFaq);
        } catch (error) {
            res.status(500).send({ message: "Не удалось получить данные", error: error.message });
        }
    }
    
    async deleteFaq(req, res) {
        try {
            const deleteFaq = await FaqService.deleteFaq(req.params.id)
            return res.status(200).json(deleteFaq)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new FaqController();
