import OnedayTourService from "./OnedayTourService.js";
import OnedayTour from "./OnedayTour.js";

class OnedayTourController {
    async onedayTour(req, res) {
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
            const tour = await OnedayTourService.onedayTour(multidayTourData);
            res.status(201).json(tour);
        } catch (error) {
            console.error('Error in MultidayTourController:', error);
            res.status(500).json({ message: 'Error adding tour' });
        }
    }

    
    async getOnedayTours(req, res) {
        try {
            const getOnedayTours = await OnedayTourService.getOnedayTours(req);
            return res.status(201).json(getOnedayTours);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    
    async updateOneOnedayTour(req, res) {
        const { id } = req.params;
        let tourData = req.body;
        let photoPaths = []; 
    
        if (req.files && req.files.photos) {
            photoPaths = req.files.photos.map(file => file.filename); 
        }
    
        try {
            const updatedTour = await OnedayTourService.updateOneOnedayTour(id, tourData, photoPaths);
            res.status(200).json(updatedTour);
        } catch (error) {
            console.error(`Ошибка в updateOneOnedayTour: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении тура' });
        }
    }

    async getOneOnedayTour(req, res) {
        try {
            const getOneOnedayTour = await OnedayTourService.getOneOnedayTour(req.params.id)
            return res.status(200).json(getOneOnedayTour)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    async deleteOnedayTour(req, res) {
        try {
            const deleteOnedayTour = await OnedayTourService.deleteOnedayTour(req.params.id)
            return res.status(200).json(deleteOnedayTour)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    
    async updateOnedayTourOrder(req, res) {
        const { orderedIds } = req.body;
    
        try {
            for (let i = 0; i < orderedIds.length; i++) {
                const id = orderedIds[i];
                await OnedayTour.findByIdAndUpdate(id, { order: i }, { new: true, runValidators: true });
            }
    
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.error(`Ошибка в updateOnedayTourOrder: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении порядка туров' });
        }
    }

}

export default new OnedayTourController();
