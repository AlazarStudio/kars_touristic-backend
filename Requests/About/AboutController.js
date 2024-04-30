import AboutService from "./AboutService.js"

class AboutController {
    async aboutCompany(req, res) {
        try {
            const about = await AboutService.aboutCompany(req.query);

            res.status(201).send(about);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };

    async mission(req, res) {
        try {
            const about = await AboutService.mission(req.query);

            res.status(201).send(about);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };

    async team(req, res) {
        try {
            const { name, description } = req.body;
            const { imgPath } = req.files;

            if (!imgPath) {
                return res.status(400).send({ message: "Необходимо прикрепить файлы imgPath" });
            }

            const team = await AboutService.team({
                name,
                description,
                imgPath: imgPath[0],
            });

            res.status(201).send(team);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };
}

export default new AboutController();
