import Region from "./Region.js";
import { transliterate } from 'transliteration';
import * as fs from 'fs';
import * as path from 'path';

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


    async updateRegion(id, regionData, regionPhotos) {
        try {
            // Если есть изображения, удаляем старые файлы
            const existingRegion = await Region.findOne({ id });
            if (!existingRegion) {
                throw new Error('Регион не найден');
            }

            if (regionPhotos.iconPath && existingRegion.iconPath) {
                const pathToFile = path.resolve('static', existingRegion.iconPath[0]);
                if (fs.existsSync(pathToFile)) {
                    fs.unlinkSync(pathToFile);
                }
            }

            if (regionPhotos.coverImgPath && existingRegion.coverImgPath) {
                const pathToFile = path.resolve('static', existingRegion.coverImgPath[0]);
                if (fs.existsSync(pathToFile)) {
                    fs.unlinkSync(pathToFile);
                }
            }

            if (regionPhotos.backgroundImgPath && existingRegion.backgroundImgPath) {
                const pathToFile = path.resolve('static', existingRegion.backgroundImgPath[0]);
                if (fs.existsSync(pathToFile)) {
                    fs.unlinkSync(pathToFile);
                }
            }

            const updateData = { ...regionData, ...regionPhotos };

            const updatedRegion = await Region.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true, runValidators: true }
            );

            return updatedRegion;
        } catch (error) {
            console.error(`Ошибка в Service updateRegion: ${error.message}`);
            throw error;
        }
    }



}

export default new RegionService();
