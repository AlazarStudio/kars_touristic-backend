import * as fs from 'fs';
import * as path from 'path';

import MultidayTour from "./MultidayTour.js";

class MultidayTourService {
    async multidayTour(multidayTourData) {
        const tour = new MultidayTour(multidayTourData);
        await tour.save();
        return tour;
    }

    async getMultidayTours(req) {
        const {
            // page = 1,
            // perPage = 10,
            search = '',
            filter,
            region = ''
        } = req.query;

        const modelFilter = { tourTitle: { $regex: search, $options: 'i' }, region: { $regex: region, $options: 'i' } };
        const totalCount = await MultidayTour.countDocuments(modelFilter).exec();
        const multidayTour = await MultidayTour.find(modelFilter)
            .sort(filter)
            // .limit(perPage)
            // .skip((page - 1) * perPage)
            .exec();

        return { totalCount, multidayTour };
    }

    async updateOneMultidayTour(id, tourData, photoPaths) {
        if (tourData.photosToDelete) {
            const pathToFile = path.resolve('static', JSON.parse(tourData.photosToDelete)[0])
            if (!fs.existsSync(pathToFile)) return;
            fs.unlinkSync(pathToFile);
        }

        if (photoPaths.length > 0) {
            const updatedTour = await MultidayTour.findByIdAndUpdate(
                id,
                {
                    $set: tourData,
                    $push: { photos: { $each: photoPaths } }
                },
                { new: true, runValidators: true }
            );
            return updatedTour;
        } else {
            const updatedTour = await MultidayTour.findByIdAndUpdate(
                id,
                { $set: tourData },
                { new: true, runValidators: true }
            );
            return updatedTour;
        }
    }



    async getOneMultidayTour(id) {
        if (!id) {
            throw new Error("не указан ID");
        }
        const getOneMultidayTour = await MultidayTour.findById(id);
        return getOneMultidayTour;
    }

    async deleteMultidayTour(id) {
        try {
            const tour = await MultidayTour.findById(id);

            if (!tour) {
                throw new Error("не указан ID");
            }

            tour.photos.forEach(photo => {
                const pathToFile = path.resolve('static', photo)
                if (!fs.existsSync(pathToFile)) return;
                fs.unlinkSync(pathToFile);
            });

            const deleteMultidayTour = await MultidayTour.findByIdAndDelete(id);

            return { message: 'Тур успешно удален', deleteMultidayTour };
        } catch (e) {
            return { message: e.message };
        }
    }

    async changeMainImg(imgData) {
        const { id, mainImgPath } = imgData;

        try {
            const changeMainImg = await MultidayTour.findByIdAndUpdate(
                id,
                { mainPhoto: mainImgPath},
                { new: true, upsert: true }
            );
            return changeMainImg;
        } catch (error) {
            throw new Error('Error updating MultidayTour: ' + error.message);
        }
    }

}

export default new MultidayTourService();
