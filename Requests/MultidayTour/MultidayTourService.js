import MultidayTour from "./MultidayTour.js"; // Предполагаем, что это Mongoose модель

class MultidayTourService {
    async multidayTour(multidayTourData) {
        const tour = new MultidayTour(multidayTourData);
        await tour.save();
        return tour;
    }

    async getMultidayTours(req) {
        const { page = 1, perPage = 10, search = '', filter, region ='' } = req.query;

        const modelFilter = { tourTitle: { $regex: search, $options: 'i' }, region: { $regex: region, $options: 'i' } };
        const totalCount = await MultidayTour.countDocuments(modelFilter).exec();
        const multidayTour = await MultidayTour.find(modelFilter)
            .sort(filter)
            .limit(perPage)
            .skip((page - 1) * perPage)
            .exec();

        return { totalCount, multidayTour };
    }

    // async getOneMultidayTour(id) {
    //     if (!id) {
    //         throw new Error("не указан ID");
    //     }
    //     const getOneMultidayTour = await MultidayTour.findById(id);
    //     return getOneMultidayTour;
    // }
}

export default new MultidayTourService();
