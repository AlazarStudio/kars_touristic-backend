import Region from "./Region.js"

class RegionService {

    async addRegion(regionData) {
        const { title, description, iconPath, coverImgPath, backgroundImgPath } = regionData;

        if (!title || !description || !iconPath || !coverImgPath || !backgroundImgPath || !iconPath.name || !coverImgPath.name || !backgroundImgPath.name) {
            throw new Error("Недостаточно данных для создания региона");
        }

        let iconPathName = iconPath.name;
        let coverImgPathName = coverImgPath.name;
        let backgroundImgPathName = backgroundImgPath.name;

        const region = new Region(
            {
                title,
                description,
                iconPath: iconPathName,
                coverImgPath: coverImgPathName,
                backgroundImgPath: backgroundImgPathName
            }
        );
        await region.save();
        return region;
    };


}

export default new RegionService()
