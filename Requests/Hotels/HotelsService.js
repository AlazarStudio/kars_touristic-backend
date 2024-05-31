import * as fs from 'fs';
import * as path from 'path';

import Hotels from "./Hotels.js";

class HotelsService {
    async Hotels(HotelsData) {
        const tour = new Hotels(HotelsData);
        await tour.save();
        return tour;
    }

    async getHotels(req) {
        const {
            // page = 1,
            // perPage = 10,
            search = '',
            filter,
            region = ''
        } = req.query;

        const modelFilter = { title: { $regex: search, $options: 'i' }, region: { $regex: region, $options: 'i' } };
        const totalCount = await Hotels.countDocuments(modelFilter).exec();
        const hotels = await Hotels.find(modelFilter)
            .sort(filter)
            // .limit(perPage)
            // .skip((page - 1) * perPage)
            .exec();

        return { totalCount, hotels };
    }

    async updateOneHotel(id, tourData, photoPaths) {
        if (tourData.photosToDelete) {
            const pathToFile = path.resolve('static', JSON.parse(tourData.photosToDelete)[0])
            if (!fs.existsSync(pathToFile)) return;
            fs.unlinkSync(pathToFile);
        }

        if (photoPaths.length > 0) {
            const updatedTour = await Hotels.findByIdAndUpdate(
                id,
                {
                    $set: tourData,
                    $push: { galery: { $each: photoPaths } }
                },
                { new: true, runValidators: true }
            );
            return updatedTour;
        } else {
            const updatedTour = await Hotels.findByIdAndUpdate(
                id,
                { $set: tourData },
                { new: true, runValidators: true }
            );
            return updatedTour;
        }
    }



    async getOneHotels(id) {
        if (!id) {
            throw new Error("не указан ID");
        }
        const getOneHotels = await Hotels.findById(id);
        return getOneHotels;
    }

    async deleteHotel(id) {
        try {
            const tour = await Hotels.findById(id);

            if (!tour) {
                throw new Error("не указан ID");
            }

            tour.galery.forEach(photo => {
                const pathToFile = path.resolve('static', photo)
                if (!fs.existsSync(pathToFile)) return;
                fs.unlinkSync(pathToFile);
            });

            const deleteHotels = await Hotels.findByIdAndDelete(id);

            return { message: 'Отель успешно удален', deleteHotels };
        } catch (e) {
            return { message: e.message };
        }
    }

    
    async changeMainImg(imgData) {
        const { id, mainImgPath } = imgData;

        try {
            const changeMainImg = await Hotels.findByIdAndUpdate(
                id,
                { mainPhoto: mainImgPath},
                { new: true, upsert: true }
            );
            return changeMainImg;
        } catch (error) {
            throw new Error('Error updating Hotels: ' + error.message);
        }
    }

}

export default new HotelsService();
