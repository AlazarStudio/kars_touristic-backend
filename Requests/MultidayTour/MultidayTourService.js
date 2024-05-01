import MultidayTour from "./MultidayTour.js"; // Предполагаем, что это Mongoose модель

class MultidayTourService {
    async multidayTour(multidayTourData) {
        const tour = new MultidayTour(multidayTourData);
        await tour.save();
        return tour;
    }
}

export default new MultidayTourService();
