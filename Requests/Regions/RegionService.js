import Region from "./Region.js"

class RegionService {

    async addRegion(regionData) {
        const { title, description} = regionData;
        
        let iconPath = regionData.iconPath.name;
        let backgroundImgPath = regionData.backgroundImgPath.name;

        const region = new Region({ title, description, iconPath, backgroundImgPath });

        await region.save();

        return region;
    };

}

export default new RegionService()
