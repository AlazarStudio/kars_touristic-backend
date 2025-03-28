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
      hotelID = "",
      roomID = "",
      oneTourID = "",
      multiTourID = "",
      autorTourID = "",
    } = req.query;

    const modelFilter = {};

    if (hotelID) modelFilter.hotelID = { $regex: hotelID, $options: "i" };
    if (roomID) modelFilter.roomID = { $regex: roomID, $options: "i" };
    if (oneTourID) modelFilter.oneTourID = { $regex: oneTourID, $options: "i" };
    if (multiTourID)
      modelFilter.multiTourID = { $regex: multiTourID, $options: "i" };
    if (autorTourID)
      modelFilter.autorTourID = { $regex: autorTourID, $options: "i" };

    const totalCount = await Review.countDocuments(modelFilter).exec();
    const reviews = await Review.find(modelFilter).exec();

    console.log("req.query:", req.query);
    console.log("modelFilter:", modelFilter);

    return { totalCount, reviews };
  }

  async updateOneReview(id, reviewData) {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { $set: reviewData },
      { new: true, runValidators: true }
    );
    return updatedReview;
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

      const deleteReview = await Review.findByIdAndDelete(id);

      return { message: "Отзыв успешно удален", deleteReview };
    } catch (e) {
      return { message: e.message };
    }
  }
}

export default new ReviewService();
