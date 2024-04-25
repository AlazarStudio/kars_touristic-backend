import Region from "./Region.js"

class RegionService {

    async addRegion(regionData) {
        const { title, description, iconPath, backgroundImgPath } = regionData;
        
        if (!title || !description || !iconPath || !backgroundImgPath || !iconPath.name || !backgroundImgPath.name) {
            throw new Error("Недостаточно данных для создания региона");
        }
    
        let iconPathName = iconPath.name;
        let backgroundImgPathName = backgroundImgPath.name;
        
        const region = new Region({ title, description, iconPath: iconPathName, backgroundImgPath: backgroundImgPathName });
        await region.save();
        return region;
    };
    

}

export default new RegionService()
