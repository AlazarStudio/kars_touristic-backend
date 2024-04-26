import RegionService from "./RegionService.js"

class RegionController {

    async addRegion(req, res) {
        try {
            const { title, description } = req.body;

            if (!req.files || !req.files.iconPath || !req.files.backgroundImgPath) {
                return res.status(400).send({ message: "Необходимо прикрепить файлы iconPath и backgroundImgPath" });
            }

            const iconPath = req.files.iconPath;
            const coverImgPath = req.files.coverImgPath;
            const backgroundImgPath = req.files.backgroundImgPath;

            const region = await RegionService.addRegion({ title, description, iconPath, coverImgPath, backgroundImgPath });

            res.status(201).send(region);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить регион", error: error.message });
        }

    };


    async getRegions(req, res) {
        try {
            const region = await RegionService.getRegions(req)
            return res.status(200).json(region)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }

}


export default new RegionController()