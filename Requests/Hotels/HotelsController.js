import HotelsService from "./HotelsService.js";

import Hotels from "./Hotels.js";

class HotelsController {
    async Hotels(req, res) {
        try {
            const { files, body } = req;
            const photoPaths = files.photos.map(file => file.filename);
            const HotelsData = {
                ...body,
                photos: photoPaths,
                places: body.places || [],
                checklists: body.checklists || [],
                days: body.days || []
            };
            const tour = await HotelsService.Hotels(HotelsData);
            res.status(201).json(tour);
        } catch (error) {
            console.error('Error in HotelsController:', error);
            res.status(500).json({ message: 'Error adding tour' });
        }
    }


    async updateOneHotels(req, res) {
        const { id } = req.params;
        let tourData = req.body;
        let photoPaths = []; 
    
        if (req.files && req.files.photos) {
            photoPaths = req.files.photos.map(file => file.filename); 
        }
    
        try {
            const updatedTour = await HotelsService.updateOneHotels(id, tourData, photoPaths);
            res.status(200).json(updatedTour);
        } catch (error) {
            console.error(`Ошибка в updateOneHotels: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении тура' });
        }
    }
    

    async updateHotelsOrder(req, res) {
        const { orderedIds } = req.body;
    
        try {
            for (let i = 0; i < orderedIds.length; i++) {
                const id = orderedIds[i];
                await Hotels.findByIdAndUpdate(id, { order: i }, { new: true, runValidators: true });
            }
    
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.error(`Ошибка в updateHotelsOrder: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении порядка туров' });
        }
    }



    async getHotels(req, res) {
        try {
            const getHotelss = await HotelsService.getHotelss(req);
            return res.status(201).json(getHotelss);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async getOneHotel(req, res) {
        try {
            const getOneHotels = await HotelsService.getOneHotels(req.params.id)
            return res.status(200).json(getOneHotels)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    async deleteHotels(req, res) {
        try {
            const deleteHotels = await HotelsService.deleteHotels(req.params.id)
            return res.status(200).json(deleteHotels)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new HotelsController();
