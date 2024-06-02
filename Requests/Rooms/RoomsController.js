import RoomsService from "./RoomsService.js";

import Rooms from "./Rooms.js";

class RoomsController {
    async Rooms(req, res) {
        try {
            const { files, body } = req;
            const photoPaths = files.photos.map(file => file.filename);
            const RoomsData = {
                ...body,
                photos: photoPaths,
                mainPhoto: photoPaths[0],
            };
            const tour = await RoomsService.Rooms(RoomsData);
            res.status(201).json(tour);
        } catch (error) {
            console.error('Error in RoomsController:', error);
            res.status(500).json({ message: 'Error adding Room' });
        }
    }


    async updateOneRoom(req, res) {
        const { id } = req.params;
        let tourData = req.body;
        let photoPaths = []; 
    
        if (req.files && req.files.photos) {
            photoPaths = req.files.photos.map(file => file.filename); 
        }
    
        try {
            const updatedTour = await RoomsService.updateOneRoom(id, tourData, photoPaths);
            res.status(200).json(updatedTour);
        } catch (error) {
            console.error(`Ошибка в updateOneRoom: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении тура' });
        }
    }
    

    async updateRoomsOrder(req, res) {
        const { orderedIds } = req.body;
    
        try {
            for (let i = 0; i < orderedIds.length; i++) {
                const id = orderedIds[i];
                await Rooms.findByIdAndUpdate(id, { order: i + 1 }, { new: true, runValidators: true });
            }
    
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.error(`Ошибка в updateRoomsOrder: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении порядка туров' });
        }
    }



    async getRooms(req, res) {
        try {
            const getRooms = await RoomsService.getRooms(req);
            return res.status(201).json(getRooms);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async getOneRoom(req, res) {
        try {
            const getOneRooms = await RoomsService.getOneRooms(req.params.id)
            return res.status(200).json(getOneRooms)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    async deleteRoom(req, res) {
        try {
            const deleteRooms = await RoomsService.deleteRoom(req.params.id)
            return res.status(200).json(deleteRooms)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

        
    async changeMainImg(req, res) {
        try {
            const changeMainImg = await RoomsService.changeMainImg(req.query);

            res.status(201).send(changeMainImg);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };
}

export default new RoomsController();
