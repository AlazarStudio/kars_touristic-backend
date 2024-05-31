import RegionService from "./RegionService.js"

class RegionController {
    async addRegion(req, res) {
        try {
            const { title, description } = req.body;
            const { iconPath, coverImgPath, backgroundImgPath } = req.files;

            if (!iconPath || !backgroundImgPath) {
                return res.status(400).send({ message: "Необходимо прикрепить файлы iconPath и backgroundImgPath" });
            }

            const region = await RegionService.addRegion({
                title,
                description,
                iconPath: iconPath[0],
                coverImgPath: coverImgPath[0],
                backgroundImgPath: backgroundImgPath[0]
            });

            res.status(201).send(region);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить регион", error: error.message });
        }
    };

    async getRegions(req, res) {
        try {
            const region = await RegionService.getRegions(req);
            return res.status(200).json(region);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async deleteRegion(req, res) {
        try {
            const deleteRegion = await RegionService.deleteRegion(req.params.id)
            return res.status(200).json(deleteRegion)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

}

export default new RegionController();
