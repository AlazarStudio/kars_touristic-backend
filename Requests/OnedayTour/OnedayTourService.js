import * as fs from 'fs';
import * as path from 'path';

import OnedayTour from "./OnedayTour.js";

class OnedayTourService {
    async onedayTour(onedayTourData) {
        const tour = new OnedayTour(onedayTourData);
        await tour.save();
        return tour;
    }

    async getOnedayTours(req) {
        const {
            // page = 1,
            // perPage = 10,
            search = '',
            filter,
            region = ''
        } = req.query;

        const modelFilter = { tourTitle: { $regex: search, $options: 'i' }, region: { $regex: region, $options: 'i' } };
        const totalCount = await OnedayTour.countDocuments(modelFilter).exec();
        const onedayTour = await OnedayTour.find(modelFilter)
            .sort(filter)
            // .limit(perPage)
            // .skip((page - 1) * perPage)
            .exec();

        return { totalCount, onedayTour };
    }

    async updateOneOnedayTour(id, tourData, photoPaths) {
        if (tourData.photosToDelete) {
            const pathToFile = path.resolve('static', JSON.parse(tourData.photosToDelete)[0])
            if (!fs.existsSync(pathToFile)) return;
            fs.unlinkSync(pathToFile);
        }

        if (photoPaths.length > 0) {
            const updatedTour = await OnedayTour.findByIdAndUpdate(
                id,
                {
                    $set: tourData,
                    $push: { photos: { $each: photoPaths } }
                },
                { new: true, runValidators: true }
            );
            return updatedTour;
        } else {
            const updatedTour = await OnedayTour.findByIdAndUpdate(
                id,
                { $set: tourData },
                { new: true, runValidators: true }
            );
            return updatedTour;
        }
    }



    async getOneOnedayTour(id) {
        if (!id) {
            throw new Error("не указан ID");
        }
        const getOneOnedayTour = await OnedayTour.findById(id);
        return getOneOnedayTour;
    }

    async deleteOnedayTour(id) {
        try {
            const tour = await OnedayTour.findById(id);

            if (!tour) {
                throw new Error("не указан ID");
            }

            tour.photos.forEach(photo => {
                const pathToFile = path.resolve('static', photo)
                if (!fs.existsSync(pathToFile)) return;
                fs.unlinkSync(pathToFile);
            });

            const deleteOnedayTour = await OnedayTour.findByIdAndDelete(id);

            return { message: 'Тур успешно удален', deleteOnedayTour };
        } catch (e) {
            return { message: e.message };
        }
    }

    
    async changeMainImg(imgData) {
        const { id, mainImgPath } = imgData;

        try {
            const changeMainImg = await OnedayTour.findByIdAndUpdate(
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

export default new OnedayTourService();
