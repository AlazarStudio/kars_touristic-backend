import MultidayTourService from "./MultidayTourService.js";

class MultidayTourController {
    async multidayTour(req, res) {
        try {
            const { files, body } = req;
            const photoPaths = files.photos.map(file => file.path);
            const multidayTourData = {
                ...body,
                photos: photoPaths,
                places: body.places || [],
                checklists: body.checklists || [],
                days: body.days || []
            };
            const tour = await MultidayTourService.multidayTour(multidayTourData);
            res.status(201).json(tour);
        } catch (error) {
            console.error('Error in MultidayTourController:', error);
            res.status(500).json({ message: 'Error adding tour' });
        }
    }
}

export default new MultidayTourController();
