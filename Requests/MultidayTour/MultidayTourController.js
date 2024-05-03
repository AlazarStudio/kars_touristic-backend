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


    async updateOneMultidayTour(req, res) {
        const { id } = req.params;
        let tourData = req.body;

        // Проверка наличия фотографий и обработка их
        if (req.files && req.files.length > 0) {
            const photoPaths = req.files.map(file => file.path); // Получение путей фотографий
            tourData.photos = photoPaths; // Добавление или обновление списка фотографий в данных тура
        }

        try {
            const updatedTour = await MultidayTourService.updateOneMultidayTour(id, tourData);
            if (!updatedTour) {
                return res.status(404).json({ message: 'Тур не найден' });
            }
            res.status(200).json(updatedTour);
        } catch (error) {
            console.error(`Ошибка в updateOneMultidayTour: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении тура' });
        }
    }



    async getMultidayTours(req, res) {
        try {
            const getMultidayTours = await MultidayTourService.getMultidayTours(req);
            return res.status(201).json(getMultidayTours);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async getOneMultidayTour(req, res) {
        try {
            const getOneMultidayTour = await MultidayTourService.getOneMultidayTour(req.params.id)
            return res.status(200).json(getOneMultidayTour)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    async deleteMultidayTour(req, res) {
        try {
            const deleteMultidayTour = await MultidayTourService.deleteMultidayTour(req.params.id)
            return res.status(200).json(deleteMultidayTour)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new MultidayTourController();
