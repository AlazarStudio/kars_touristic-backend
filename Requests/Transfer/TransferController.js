import TransferService from "./TransferService.js"

class TransferController {
    async transfer(req, res) {
        try {
            const { title, description, link } = req.query;

            const transfer = await TransferService.transfer({
                title,
                description,
                link
            });

            res.status(201).send(transfer);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };
}

export default new TransferController();
