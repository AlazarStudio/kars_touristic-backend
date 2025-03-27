import ReviewService from "./ReviewService.js";
import Review from "./Review.js";

class ReviewController {
  async Review(req, res) {
    try {
      const { body } = req;
      const ReviewData = {
        ...body,
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

    try {
      const updatedReview = await ReviewService.updateOneReview(id, reviewData);
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
