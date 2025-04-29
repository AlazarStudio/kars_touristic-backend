import AuthorTourService from "./AuthorTourService.js";

import AuthorTour from "./AuthorTour.js";

class AuthorTourController {
  async AuthorTour(req, res) {
    try {
      const { files, body } = req;
      const photoPaths = files.photos.map((file) => file.filename);
      const AuthorTourData = {
        ...body,
        photos: photoPaths,
        places: body.places || [],
        checklists: body.checklists || [],
        entries: body.entries || [],
        days: body.days || [],
        mainPhoto: photoPaths[0],
      };
      const tour = await AuthorTourService.AuthorTour(AuthorTourData);
      res.status(201).json(tour);
    } catch (error) {
      console.error("Error in AuthorTourController:", error);
      res.status(500).json({ message: "Error adding tour" });
    }
  }

  async updateOneAuthorTour(req, res) {
    const { id } = req.params;
    let tourData = req.body;
    let photoPaths = [];

    if (req.files && req.files.photos) {
      photoPaths = req.files.photos.map((file) => file.filename);
    }

    try {
      const updatedTour = await AuthorTourService.updateOneAuthorTour(
        id,
        tourData,
        photoPaths
      );
      res.status(200).json(updatedTour);
    } catch (error) {
      console.error(`Ошибка в updateOneAuthorTour: ${error}`);
      res.status(500).json({ message: "Ошибка при обновлении тура" });
    }
  }

  async updateAuthorTourOrder(req, res) {
    const { orderedIds } = req.body;

    try {
      for (let i = 0; i < orderedIds.length; i++) {
        const id = orderedIds[i];
        await AuthorTour.findByIdAndUpdate(
          id,
          { order: i + 1 },
          { new: true, runValidators: true }
        );
      }

      res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      console.error(`Ошибка в updateAuthorTourOrder: ${error}`);
      res.status(500).json({ message: "Ошибка при обновлении порядка туров" });
    }
  }

  async getAuthorTours(req, res) {
    try {
      const getAuthorTours = await AuthorTourService.getAuthorTours(req);
      return res.status(201).json(getAuthorTours);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getOneAuthorTour(req, res) {
    try {
      const getOneAuthorTour = await AuthorTourService.getOneAuthorTour(
        req.params.id
      );
      return res.status(200).json(getOneAuthorTour);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteAuthorTour(req, res) {
    try {
      const deleteAuthorTour = await AuthorTourService.deleteAuthorTour(
        req.params.id
      );
      return res.status(200).json(deleteAuthorTour);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async changeMainImg(req, res) {
    try {
      const changeMainImg = await AuthorTourService.changeMainImg(req.query);

      res.status(201).send(changeMainImg);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }
}

export default new AuthorTourController();
