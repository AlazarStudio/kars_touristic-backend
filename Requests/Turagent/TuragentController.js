import TuragentService from "./TuragentService.js"

class TuragentController {
    async turagent(req, res) {
        try {
            const { description } = req.body;
            const { docPath } = req.files;

            if (!docPath) {
                return res.status(400).send({ message: "Необходимо прикрепить файлы docPath" });
            }

            const turagent = await TuragentService.turagent({
                description,
                docPath: docPath[0],
            });

            res.status(201).send(turagent);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };
}

export default new TuragentController();
