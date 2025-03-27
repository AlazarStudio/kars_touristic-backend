import * as fs from "fs";
import * as path from "path";

import Places from "./Places.js";

import MultidayTour from "../MultidayTour/MultidayTour.js";

import OnedayTour from "../OnedayTour/OnedayTour.js";

class PlacesService {
  async Places(PlacesData) {
    const tour = new Places(PlacesData);
    await tour.save();
    return tour;
  }

  async getPlaces(req) {
    const {
      // page = 1,
      // perPage = 10,
      search = "",
      filter,
      region = "",
      hotelId,
    } = req.query;

    const modelFilter = {
      title: { $regex: search, $options: "i" },
      region: { $regex: region, $options: "i" },
    };

    const totalCount = await Places.countDocuments(modelFilter).exec();
    const places = await Places.find(modelFilter)
      .sort(filter)
      // .limit(perPage)
      // .skip((page - 1) * perPage)
      .exec();

    return { totalCount, places };
  }

  async updateOnePlace(id, tourData, photoPaths) {
    if (tourData.photosToDelete) {
      const pathToFile = path.resolve(
        "static",
        JSON.parse(tourData.photosToDelete)[0]
      );
      if (!fs.existsSync(pathToFile)) return;
      fs.unlinkSync(pathToFile);
    }

    if (photoPaths.length > 0) {
      const updatedTour = await Places.findByIdAndUpdate(
        id,
        {
          $set: tourData,
          $push: { photos: { $each: photoPaths } },
        },
        { new: true, runValidators: true }
      );
      return updatedTour;
    } else {
      const updatedTour = await Places.findByIdAndUpdate(
        id,
        { $set: tourData },
        { new: true, runValidators: true }
      );
      return updatedTour;
    }
  }

  async getMultidayToursInPlace(placeTitle) {
    const modelFilter = {
      places: {
        $elemMatch: {
          $regex: new RegExp(placeTitle, "i"),
        },
      },
    };

    const totalCount = await MultidayTour.countDocuments(modelFilter).exec();
    const getMultidayToursInPlace = await MultidayTour.find(modelFilter).exec();

    return { totalCount, getMultidayToursInPlace };
  }

  async getOnedayToursInPlace(placeTitle) {
    const modelFilter = {
      places: {
        $elemMatch: {
          $regex: new RegExp(placeTitle, "i"),
        },
      },
    };

    const totalCount = await OnedayTour.countDocuments(modelFilter).exec();
    const getOnedayToursInPlace = await OnedayTour.find(modelFilter).exec();

    return { totalCount, getOnedayToursInPlace };
  }

  async getOnePlaces(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const getOnePlaces = await Places.findById(id);
    return getOnePlaces;
  }

  async deletePlace(id) {
    try {
      const tour = await Places.findById(id);

      if (!tour) {
        throw new Error("не указан ID");
      }

      tour.photos.forEach((photo) => {
        const pathToFile = path.resolve("static", photo);
        if (!fs.existsSync(pathToFile)) return;
        fs.unlinkSync(pathToFile);
      });

      const deletePlaces = await Places.findByIdAndDelete(id);

      return { message: "Отель успешно удален", deletePlaces };
    } catch (e) {
      return { message: e.message };
    }
  }

  async changeMainImg(imgData) {
    const { id, mainImgPath } = imgData;

    try {
      const changeMainImg = await Places.findByIdAndUpdate(
        id,
        { mainPhoto: mainImgPath },
        { new: true, upsert: true }
      );
      return changeMainImg;
    } catch (error) {
      throw new Error("Error updating Places: " + error.message);
    }
  }
}

export default new PlacesService();
