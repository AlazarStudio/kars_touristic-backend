import * as fs from 'fs';
import * as path from 'path';

import HotelBron from "./HotelBron.js";

class HotelBronService {
    async hotelBron(hotelBronData) {
        const tour = new HotelBron(hotelBronData);
        await tour.save();
        return tour;
    }

    async getHotelBrons(req) {
        const {
            // page = 1,
            // perPage = 10,
            search = '',
            filter,
            // region = ''
        } = req.query;

        const modelFilter = { name: { $regex: search, $options: 'i' }};
        const totalCount = await HotelBron.countDocuments(modelFilter).exec();
        const hotelBron = await HotelBron.find(modelFilter)
            .sort(filter)
            // .limit(perPage)
            // .skip((page - 1) * perPage)
            .exec();

        return { totalCount, hotelBron };
    }

    async updateOneHotelBron(id, tourData) {
        const updatedTour = await HotelBron.findByIdAndUpdate(
            id,
            { $set: tourData },
            { new: true, runValidators: true }
        );
        return updatedTour;
    }



    async getOneHotelBron(id) {
        if (!id) {
            throw new Error("не указан ID");
        }
        const getOneHotelBron = await HotelBron.findById(id);
        return getOneHotelBron;
    }

    async deleteHotelBron(id) {
        try {
            const tour = await HotelBron.findById(id);

            if (!tour) {
                throw new Error("не указан ID");
            }

            const deleteHotelBron = await HotelBron.findByIdAndDelete(id);

            return { message: 'Тур успешно удален', deleteHotelBron };
        } catch (e) {
            return { message: e.message };
        }
    }

    async deleteAllHotelBrons() {
        try {
            const deleteResult = await HotelBron.deleteMany({});
    
            return { message: 'Все агенты успешно удалены', deletedCount: deleteResult.deletedCount };
        } catch (e) {
            return { message: e.message };
        }
    }


    async changeMainImg(imgData) {
        const { id, mainImgPath } = imgData;

        try {
            const changeMainImg = await HotelBron.findByIdAndUpdate(
                id,
                { mainPhoto: mainImgPath },
                { new: true, upsert: true }
            );
            return changeMainImg;
        } catch (error) {
            throw new Error('Error updating MultidayTour: ' + error.message);
        }
    }

}

export default new HotelBronService();
