import RegionService from "./RegionService.js"

class RegionController {

    async addRegion(req, res) {
        try {
            const { title, description } = req.body;
            const iconPath = req.files['icon'][0].path;
            const backgroundImgPath = req.files['backgroundImg'][0].path;

            const region = await RegionService.addRegion({ title, description, iconPath, backgroundImgPath });

            res.status(201).send(region);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить регион", error: error.message });
        }
    };

}


export default new RegionController()