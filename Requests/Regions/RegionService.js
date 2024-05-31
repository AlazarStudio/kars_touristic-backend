import Region from "./Region.js";
import { transliterate } from 'transliteration';

class RegionService {
    async addRegion(regionData) {
        const { title, description, iconPath, coverImgPath, backgroundImgPath } = regionData;

        const iconPathName = iconPath ? iconPath.filename : '';
        const coverImgPathName = coverImgPath ? coverImgPath.filename : '';
        const backgroundImgPathName = backgroundImgPath ? backgroundImgPath.filename : '';
        const link = transliterate(title);

        const region = new Region({
            title,
            description,
            iconPath: iconPathName,
            coverImgPath: coverImgPathName,
            backgroundImgPath: backgroundImgPathName,
            link
        });

        await region.save();
        return region;
    };

    async getRegions(req) {
        const regions = await Region.find();
        return { regions };
    }

    
    async deleteRegion(id) {
        try {
            const deleteRegion = await Region.findByIdAndDelete(id);

            return { message: 'Успешно удален', deleteRegion };
        } catch (e) {
            return { message: e.message };
        }
    }

}

export default new RegionService();
