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
      filter,
      hotelId = "",
      roomId = "",
      oneTourId = "",
      multiTourId = "",
      autorTourId = "",
    } = req.query;

    console.log("\n req", req.query);

    const modelFilter = {};

    if (hotelId) modelFilter.hotelID = { $regex: hotelId, $options: "i" };
    if (roomId) modelFilter.roomID = { $regex: roomId, $options: "i" };
    if (oneTourId) modelFilter.oneTourID = { $regex: oneTourId, $options: "i" };
    if (multiTourId)
      modelFilter.multiTourID = { $regex: multiTourId, $options: "i" };
    if (autorTourId)
      modelFilter.autorTourID = { $regex: autorTourId, $options: "i" };

    console.log(
      "\n modelFilter" + modelFilter,
      "\n modelFilter string" + JSON.stringify(modelFilter)
    );

    const totalCount = await Review.countDocuments(modelFilter).exec();
    const reviews = await Review.find(modelFilter).sort(filter).exec();

    console.log(
      "\n reviews" + reviews,
      "\n reviews string" + JSON.stringify(reviews)
    );

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
