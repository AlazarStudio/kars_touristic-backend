import * as fs from 'fs';
import * as path from 'path';

import Rooms from "./Rooms.js";

class RoomsService {
    async Rooms(RoomsData) {
        const tour = new Rooms(RoomsData);
        await tour.save();
        return tour;
    }

    async getRooms(req) {
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
            hotelID: { $regex: hotelId, $options: 'i' }
        };

        const totalCount = await Rooms.countDocuments(modelFilter).exec();
        const rooms = await Rooms.find(modelFilter)
            .sort(filter)
            // .limit(perPage)
            // .skip((page - 1) * perPage)
            .exec();

        return { totalCount, rooms };
    }

    async updateOneRoom(id, tourData, photoPaths) {
        if (tourData.photosToDelete) {
            const pathToFile = path.resolve('static', JSON.parse(tourData.photosToDelete)[0])
            if (!fs.existsSync(pathToFile)) return;
            fs.unlinkSync(pathToFile);
        }

        if (photoPaths.length > 0) {
            const updatedTour = await Rooms.findByIdAndUpdate(
                id,
                {
                    $set: tourData,
                    $push: { galery: { $each: photoPaths } }
                },
                { new: true, runValidators: true }
            );
            return updatedTour;
        } else {
            const updatedTour = await Rooms.findByIdAndUpdate(
                id,
                { $set: tourData },
                { new: true, runValidators: true }
            );
            return updatedTour;
        }
    }



    async getOneRooms(id) {
        if (!id) {
            throw new Error("не указан ID");
        }
        const getOneRooms = await Rooms.findById(id);
        return getOneRooms;
    }

    async deleteRoom(id) {
        try {
            const tour = await Rooms.findById(id);

            if (!tour) {
                throw new Error("не указан ID");
            }

            tour.galery.forEach(photo => {
                const pathToFile = path.resolve('static', photo)
                if (!fs.existsSync(pathToFile)) return;
                fs.unlinkSync(pathToFile);
            });

            const deleteRooms = await Rooms.findByIdAndDelete(id);

            return { message: 'Отель успешно удален', deleteRooms };
        } catch (e) {
            return { message: e.message };
        }
    }

    
    async changeMainImg(imgData) {
        const { id, mainImgPath } = imgData;

        try {
            const changeMainImg = await Rooms.findByIdAndUpdate(
                id,
                { mainPhoto: mainImgPath},
                { new: true, upsert: true }
            );
            return changeMainImg;
        } catch (error) {
            throw new Error('Error updating Rooms: ' + error.message);
        }
    }

}

export default new RoomsService();
