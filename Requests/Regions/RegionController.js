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

    async getOneRegion(req, res) {
        try {
            const getOneRegion = await RegionService.getOneRegion(req.params.link)
            return res.status(200).json(getOneRegion)
        } catch (e) {
            res.status(500).json(e.message)
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

    async updateRegion(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;
    
        const photos = req.files;
    
        const iconPath = photos && photos['iconPath'] ? photos['iconPath'].map(file => file.filename) : [];
        const coverImgPath = photos && photos['coverImgPath'] ? photos['coverImgPath'].map(file => file.filename) : [];
        const backgroundImgPath = photos && photos['backgroundImgPath'] ? photos['backgroundImgPath'].map(file => file.filename) : [];
    
        const regionData = { title, description };
    
        const regionPhotos = {};
        if (iconPath.length > 0) regionPhotos.iconPath = iconPath;
        if (coverImgPath.length > 0) regionPhotos.coverImgPath = coverImgPath;
        if (backgroundImgPath.length > 0) regionPhotos.backgroundImgPath = backgroundImgPath;
    
        try {
            const updatedRegion = await RegionService.updateRegion(id, regionData, regionPhotos);
            res.status(200).json(updatedRegion);
        } catch (error) {
            console.error(`Ошибка в updateRegion: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении региона' });
        }
    }
    

}

export default new RegionController();