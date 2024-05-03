import * as fs from 'fs';
import * as path from 'path';

import MultidayTour from "./MultidayTour.js"; // Предполагаем, что это Mongoose модель

class MultidayTourService {
    async multidayTour(multidayTourData) {
        const tour = new MultidayTour(multidayTourData);
        await tour.save();
        return tour;
    }

    async getMultidayTours(req) {
        const { page = 1, perPage = 10, search = '', filter, region = '' } = req.query;

        const modelFilter = { tourTitle: { $regex: search, $options: 'i' }, region: { $regex: region, $options: 'i' } };
        const totalCount = await MultidayTour.countDocuments(modelFilter).exec();
        const multidayTour = await MultidayTour.find(modelFilter)
            .sort(filter)
            .limit(perPage)
            .skip((page - 1) * perPage)
            .exec();

        return { totalCount, multidayTour };
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
                setTimeout(() => {
                    fs.unlinkSync(pathToFile);
                }, 1000)
            });

            const deleteMultidayTour = await MultidayTour.findByIdAndDelete(id);

            return { message: 'Тур успешно удален', deleteResult };
        } catch (e) {
            return { message: e.message };
        }
    }
}

export default new MultidayTourService();
