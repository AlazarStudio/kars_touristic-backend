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

    async getOneRegion(link) {
        if (!link) {
            throw new Error("не указан ID");
        }
        const getOneRegion = await Region.findOne({ link: link });
        return getOneRegion;
    }

    
    async deleteRegion(id) {
        try {
            const deleteRegion = await Region.findByIdAndDelete(id);

            return { message: 'Успешно удален', deleteRegion };
        } catch (e) {
            return { message: e.message };
        }
    }

    async updateRegion(link, regionData) {
        // Если есть изображения, удаляем старые файлы
        // const existingRegion = await Region.findOne({ link });
        // if (!existingRegion) {
        //     throw new Error('Регион не найден');
        // }
    
        // if (regionData.iconPath && existingRegion.iconPath) {
        //     const pathToFile = path.resolve('static', existingRegion.iconPath);
        //     if (fs.existsSync(pathToFile)) {
        //         fs.unlinkSync(pathToFile);
        //     }
        // }
    
        // if (regionData.coverImgPath && existingRegion.coverImgPath) {
        //     const pathToFile = path.resolve('static', existingRegion.coverImgPath);
        //     if (fs.existsSync(pathToFile)) {
        //         fs.unlinkSync(pathToFile);
        //     }
        // }
    
        // if (regionData.backgroundImgPath && existingRegion.backgroundImgPath) {
        //     const pathToFile = path.resolve('static', existingRegion.backgroundImgPath);
        //     if (fs.existsSync(pathToFile)) {
        //         fs.unlinkSync(pathToFile);
        //     }
        // }
    
        // // Обновляем данные региона, исключая undefined поля
        // const updatedRegion = await Region.findOneAndUpdate(
        //     { link },
        //     { $set: regionData },
        //     { new: true, runValidators: true }
        // );
    
        // return updatedRegion;
    }
    
    

}

export default new RegionService();
