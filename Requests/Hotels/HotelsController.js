import HotelsService from "./HotelsService.js";

import Hotels from "./Hotels.js";

class HotelsController {
  async Hotels(req, res) {
    try {
      const { files, body } = req;
      const photoPaths = files.galery.map((file) => file.filename);
      const HotelsData = {
        ...body,
        galery: photoPaths,
        mainPhoto: photoPaths[0],
      };
      const tour = await HotelsService.Hotels(HotelsData);
      res.status(201).json(tour);
    } catch (error) {
      console.error("Error in HotelsController:", error);
      res.status(500).json({ message: "Error adding Hotel" });
    }
  }

  async updateOneHotel(req, res) {
    const { id } = req.params;
    let { tourData, visible } = req.body;
    let photoPaths = [];

    if (req.files && req.files.galery) {
      photoPaths = req.files.galery.map((file) => file.filename);
    }

    try {
      const updatedTour = await HotelsService.updateOneHotel(
        id,
        tourData,
        visible,
        photoPaths
      );
      res.status(200).json(updatedTour);
    } catch (error) {
      console.error(`Ошибка в updateOneHotels: ${error}`);
      res.status(500).json({ message: "Ошибка при обновлении тура" });
    }
  }

  async updateHotelsOrder(req, res) {
    const { orderedIds } = req.body;

    try {
      for (let i = 0; i < orderedIds.length; i++) {
        const id = orderedIds[i];
        await Hotels.findByIdAndUpdate(
          id,
          { order: i + 1 },
          { new: true, runValidators: true }
        );
      }

      res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      console.error(`Ошибка в updateHotelsOrder: ${error}`);
      res.status(500).json({ message: "Ошибка при обновлении порядка туров" });
    }
  }

  async getHotels(req, res) {
    try {
      const getHotels = await HotelsService.getHotels(req);
      return res.status(201).json(getHotels);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getOneHotel(req, res) {
    try {
      const getOneHotels = await HotelsService.getOneHotels(req.params.id);
      return res.status(200).json(getOneHotels);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteHotel(req, res) {
    try {
      const deleteHotels = await HotelsService.deleteHotel(req.params.id);
      return res.status(200).json(deleteHotels);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async changeMainImg(req, res) {
    try {
      const changeMainImg = await HotelsService.changeMainImg(req.query);

      res.status(201).send(changeMainImg);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }
}

export default new HotelsController();
