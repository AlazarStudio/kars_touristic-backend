import * as fs from "fs";
import * as path from "path";

import Review from "./Review.js";

class ReviewService {
  async Review(ReviewData) {
    const review = new Review(ReviewData);
    await review.save();
    return review;
  }

  async getReview(req) {
    const {
      search = "",
      filter,
      hotelId,
      roomId,
      oneTourId,
      multiTourId,
      autorTourId,
    } = req.query;

    const modelFilter = {
      title: { $regex: search, $options: "i" },
      hotelID: { $regex: hotelId, $options: "i" },
      roomID: { $regex: roomId, $options: "i" },
      oneTourID: { $regex: oneTourId, $options: "i" },
      multiTourID: { $regex: multiTourId, $options: "i" },
      autorTourID: { $regex: autorTourId, $options: "i" },
    };

    const totalCount = await Review.countDocuments(modelFilter).exec();
    const reviews = await Review.find(modelFilter).sort(filter).exec();

    return { totalCount, reviews };
  }

  async updateOneReview(id, reviewData, photoPaths) {
    if (reviewData.photosToDelete) {
      const pathToFile = path.resolve(
        "static",
        JSON.parse(reviewData.photosToDelete)[0]
      );
      if (!fs.existsSync(pathToFile)) return;
      fs.unlinkSync(pathToFile);
    }

    if (photoPaths.length > 0) {
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        {
          $set: reviewData,
          $push: { photos: { $each: photoPaths } },
        },
        { new: true, runValidators: true }
      );
      return updatedReview;
    } else {
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { $set: reviewData },
        { new: true, runValidators: true }
      );
      return updatedReview;
    }
  }

  async getOneReview(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const getOneReview = await Review.findById(id);
    return getOneReview;
  }

  async deleteReview(id) {
    try {
      const review = await Review.findById(id);

      if (!review) {
        throw new Error("не указан ID");
      }

      review.photos.forEach((photo) => {
        const pathToFile = path.resolve("static", photo);
        if (!fs.existsSync(pathToFile)) return;
        fs.unlinkSync(pathToFile);
      });

      const deleteReview = await Review.findByIdAndDelete(id);

      return { message: "Отзыв успешно удален", deleteReview };
    } catch (e) {
      return { message: e.message };
    }
  }
}

export default new ReviewService();
