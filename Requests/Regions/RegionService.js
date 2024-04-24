import Region from "./Region.js"

class RegionService {

    async addRegion(regionData) {
        const { title, description, iconPath, backgroundImgPath } = regionData;

        const region = new Region({ title, description, iconPath, backgroundImgPath });

        await region.save();

        return region;
    };

}

export default new RegionService()
