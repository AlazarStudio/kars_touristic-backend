import * as fs from 'fs';
import * as path from 'path';

import Events from "./Events.js";

class EventsService {
    async Events(EventsData) {
        const tour = new Events(EventsData);
        await tour.save();
        return tour;
    }

    async getEvents(req) {
        const {
            // page = 1,
            // perPage = 10,
            search = '',
            filter,
            region = '',
            hotelId
        } = req.query;

        const modelFilter = {
            title: { $regex: search, $options: 'i' },
            region: { $regex: region, $options: 'i' },
        };

        const totalCount = await Events.countDocuments(modelFilter).exec();
        const events = await Events.find(modelFilter)
            .sort(filter)
            // .limit(perPage)
            // .skip((page - 1) * perPage)
            .exec();

        return { totalCount, events };
    }

    async updateOneEvent(id, tourData, photoPaths) {
        if (tourData.photosToDelete) {
            const pathToFile = path.resolve('static', JSON.parse(tourData.photosToDelete)[0])
            if (!fs.existsSync(pathToFile)) return;
            fs.unlinkSync(pathToFile);
        }

        if (photoPaths.length > 0) {
            const updatedTour = await Events.findByIdAndUpdate(
                id,
                {
                    $set: tourData,
                    $push: { photos: { $each: photoPaths } }
                },
                { new: true, runValidators: true }
            );
            return updatedTour;
        } else {
            const updatedTour = await Events.findByIdAndUpdate(
                id,
                { $set: tourData },
                { new: true, runValidators: true }
            );
            return updatedTour;
        }
    }


    async getOneEvents(id) {
        if (!id) {
            throw new Error("не указан ID");
        }
        const getOneEvents = await Events.findById(id);
        return getOneEvents;
    }

    async deleteEvent(id) {
        try {
            const tour = await Events.findById(id);

            if (!tour) {
                throw new Error("не указан ID");
            }

            tour.photos.forEach(photo => {
                const pathToFile = path.resolve('static', photo)
                if (!fs.existsSync(pathToFile)) return;
                fs.unlinkSync(pathToFile);
            });

            const deleteEvents = await Events.findByIdAndDelete(id);

            return { message: 'Отель успешно удален', deleteEvents };
        } catch (e) {
            return { message: e.message };
        }
    }


    async changeMainImg(imgData) {
        const { id, mainImgPath } = imgData;

        try {
            const changeMainImg = await Events.findByIdAndUpdate(
                id,
                { mainPhoto: mainImgPath },
                { new: true, upsert: true }
            );
            return changeMainImg;
        } catch (error) {
            throw new Error('Error updating Events: ' + error.message);
        }
    }

}

export default new EventsService();
