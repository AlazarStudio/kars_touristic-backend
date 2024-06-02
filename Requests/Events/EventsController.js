import EventsService from "./EventsService.js";

import Events from "./Events.js";

class EventsController {
    async Events(req, res) {
        try {
            const { files, body } = req;
            const photoPaths = files.photos.map(file => file.filename);
            const EventsData = {
                ...body,
                photos: photoPaths,
                mainPhoto: photoPaths[0],
            };
            const tour = await EventsService.Events(EventsData);
            res.status(201).json(tour);
        } catch (error) {
            console.error('Error in EventsController:', error);
            res.status(500).json({ message: 'Error adding Event' });
        }
    }


    async updateOneEvent(req, res) {
        const { id } = req.params;
        let tourData = req.body;
        let photoPaths = []; 
    
        if (req.files && req.files.photos) {
            photoPaths = req.files.photos.map(file => file.filename); 
        }
    
        try {
            const updatedTour = await EventsService.updateOneEvent(id, tourData, photoPaths);
            res.status(200).json(updatedTour);
        } catch (error) {
            console.error(`Ошибка в updateOneEvents: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении тура' });
        }
    }
    

    async updateEventsOrder(req, res) {
        const { orderedIds } = req.body;
    
        try {
            for (let i = 0; i < orderedIds.length; i++) {
                const id = orderedIds[i];
                await Events.findByIdAndUpdate(id, { order: i + 1 }, { new: true, runValidators: true });
            }
    
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.error(`Ошибка в updateEventsOrder: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении порядка туров' });
        }
    }



    async getEvents(req, res) {
        try {
            const getEvents = await EventsService.getEvents(req);
            return res.status(201).json(getEvents);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }


    async getOneEvent(req, res) {
        try {
            const getOneEvents = await EventsService.getOneEvents(req.params.id)
            return res.status(200).json(getOneEvents)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    async deleteEvent(req, res) {
        try {
            const deleteEvents = await EventsService.deleteEvent(req.params.id)
            return res.status(200).json(deleteEvents)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

        
    async changeMainImg(req, res) {
        try {
            const changeMainImg = await EventsService.changeMainImg(req.query);

            res.status(201).send(changeMainImg);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };
}

export default new EventsController();
