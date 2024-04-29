import Region from "./Region.js"
import { transliterate } from 'transliteration';

class RegionService {

    async addRegion(regionData) {
        const { title, description, iconPath, coverImgPath, backgroundImgPath } = regionData;

        if (!title || !description || !iconPath || !coverImgPath || !backgroundImgPath || !iconPath.name || !coverImgPath.name || !backgroundImgPath.name) {
            throw new Error("Недостаточно данных для создания региона");
        }

        let iconPathName = iconPath.name;
        let coverImgPathName = coverImgPath.name;
        let backgroundImgPathName = backgroundImgPath.name;
        let link = transliterate(title);

        const region = new Region(
            {
                title,
                description,
                iconPath: iconPathName,
                coverImgPath: coverImgPathName,
                backgroundImgPath: backgroundImgPathName,
                link: link,
            }
        );
        await region.save();
        return region;
    };

    async getRegions(req) {
        const regions = await Region.find()

        return {
            regions
        };
    }

}

export default new RegionService()
