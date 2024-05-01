import OnedayTour from "./OnedayTour.js"; // Предполагаем, что это Mongoose модель

class OnedayTourService {
    async onedayTour(onedayTourData) {
        const tour = new OnedayTour(onedayTourData);
        await tour.save();
        return tour;
    }
}

export default new OnedayTourService();
