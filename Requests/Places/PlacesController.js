import PlacesService from "./PlacesService.js";

import Places from "./Places.js";

class PlacesController {
    async Places(req, res) {
        try {
            const { files, body } = req;
            const photoPaths = files.galery.map(file => file.filename);
            const PlacesData = {
                ...body,
                galery: photoPaths,
                mainPhoto: photoPaths[0],
            };
            const tour = await PlacesService.Places(PlacesData);
            res.status(201).json(tour);
        } catch (error) {
            console.error('Error in PlacesController:', error);
            res.status(500).json({ message: 'Error adding Place' });
        }
    }


    async updateOnePlace(req, res) {
        const { id } = req.params;
        let tourData = req.body;
        let photoPaths = []; 
    
        if (req.files && req.files.galery) {
            photoPaths = req.files.galery.map(file => file.filename); 
        }
    
        try {
            const updatedTour = await PlacesService.updateOnePlace(id, tourData, photoPaths);
            res.status(200).json(updatedTour);
        } catch (error) {
            console.error(`Ошибка в updateOnePlaces: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении тура' });
        }
    }
    

    async updatePlacesOrder(req, res) {
        const { orderedIds } = req.body;
    
        try {
            for (let i = 0; i < orderedIds.length; i++) {
                const id = orderedIds[i];
                await Places.findByIdAndUpdate(id, { order: i + 1 }, { new: true, runValidators: true });
            }
    
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.error(`Ошибка в updatePlacesOrder: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении порядка туров' });
        }
    }



    async getPlaces(req, res) {
        try {
            const getPlaces = await PlacesService.getPlaces(req);
            return res.status(201).json(getPlaces);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async getOnePlace(req, res) {
        try {
            const getOnePlaces = await PlacesService.getOnePlaces(req.params.id)
            return res.status(200).json(getOnePlaces)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    async deletePlace(req, res) {
        try {
            const deletePlaces = await PlacesService.deletePlace(req.params.id)
            return res.status(200).json(deletePlaces)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

        
    async changeMainImg(req, res) {
        try {
            const changeMainImg = await PlacesService.changeMainImg(req.query);

            res.status(201).send(changeMainImg);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };
}

export default new PlacesController();
