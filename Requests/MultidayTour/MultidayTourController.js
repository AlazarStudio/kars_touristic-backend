import MultidayTourService from "./MultidayTourService.js";

class MultidayTourController {
    async multidayTour(req, res) {
        try {
            const { files, body } = req;
            const photoPaths = files.photos.map(file => file.filename);
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
    
    async getMultidayTours(req, res) {
        try {
            const getMultidayTours = await MultidayTourService.getMultidayTours(req);
            return res.status(200).json(getMultidayTours);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
}

export default new MultidayTourController();
