import ReviewService from "./ReviewService.js";

import Review from "./Review.js";

class ReviewController {
  async Review(req, res) {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    try {
      const { files, body } = req;
      const photoPaths = files.photos.map((file) => file.filename);
      const ReviewData = {
        ...body,
        userId,
        photos: photoPaths,
      };
      const review = await ReviewService.Review(ReviewData);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error in ReviewController:", error);
      res.status(500).json({ message: "Error adding Review" });
    }
  }

  async updateOneReview(req, res) {
    const { id } = req.params;
    let reviewData = req.body;
    let photoPaths = [];

    if (req.files && req.files.photos) {
      photoPaths = req.files.photos.map((file) => file.filename);
    }

    try {
      const updatedReview = await ReviewService.updateOneReview(
        id,
        reviewData,
        photoPaths
      );
      res.status(200).json(updatedReview);
    } catch (error) {
      console.error(`Ошибка в updateOneReview: ${error}`);
      res.status(500).json({ message: "Ошибка при обновлении отзыва" });
    }
  }

  async getReview(req, res) {
    try {
      const getReview = await ReviewService.getReview(req);
      return res.status(201).json(getReview);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getOneReview(req, res) {
    try {
      const getOneReview = await ReviewService.getOneReview(req.params.id);
      return res.status(200).json(getOneReview);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteReview(req, res) {
    try {
      const deleteReview = await ReviewService.deleteReview(req.params.id);
      return res.status(200).json(deleteReview);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new ReviewController();
