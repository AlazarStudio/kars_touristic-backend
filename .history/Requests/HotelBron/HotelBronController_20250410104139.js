import HotelBronService from "./HotelBronTourService.js";
import HotelBron from "./HotelBron.js";

class HotelBronController {
  async hotelBron(req, res) {
    try {
      const { body } = req;

      const multidayTourData = {
        ...body,
      };
      const tour = await HotelBronService.hotelBron(multidayTourData);
      res.status(201).json(tour);
    } catch (error) {
      console.error("Error in MultidayTourController:", error);
      res.status(500).json({ message: "Error adding tour" });
    }
  }

  async getHotelBrons(req, res) {
    try {
      const getHotelBrons = await HotelBronService.getHotelBrons(req);
      return res.status(201).json(getHotelBrons);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  // Обновление статуса

  async updateHotelBronStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updated = await HotelBron.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Бронь не найдена" });
      }
  
      res.status(200).json(updated);
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

    // Обновление статуса
  

  async updateOneHotelBron(req, res) {
    const { id } = req.params;
    let tourData = req.body;

    try {
      const updatedTour = await HotelBronService.updateOneHotelBron(
        id,
        tourData
      );
      res.status(200).json(updatedTour);
    } catch (error) {
      console.error(`Ошибка в updateOneHotelBron: ${error}`);
      res.status(500).json({ message: "Ошибка при обновлении тура" });
    }
  }

  async getOneHotelBron(req, res) {
    try {
      const getOneHotelBron = await HotelBronService.getOneHotelBron(
        req.params.id
      );
      return res.status(200).json(getOneHotelBron);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteHotelBron(req, res) {
    try {
      const deleteHotelBron = await HotelBronService.deleteHotelBron(
        req.params.id
      );
      return res.status(200).json(deleteHotelBron);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteAllHotelBrons(req, res) {
    try {
      const deleteAllHotelBrons = await HotelBronService.deleteAllHotelBrons(
        req.params.id
      );
      return res.status(200).json(deleteAllHotelBrons);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateHotelBronOrder(req, res) {
    const { orderedIds } = req.body;

    try {
      for (let i = 0; i < orderedIds.length; i++) {
        const id = orderedIds[i];
        await HotelBron.findByIdAndUpdate(
          id,
          { order: i + 1 },
          { new: true, runValidators: true }
        );
      }

      res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      console.error(`Ошибка в updateHotelBronOrder: ${error}`);
      res.status(500).json({ message: "Ошибка при обновлении порядка туров" });
    }
  }

  async changeMainImg(req, res) {
    try {
      const changeMainImg = await HotelBronService.changeMainImg(req.query);

      res.status(201).send(changeMainImg);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }
}

export default new HotelBronController();
