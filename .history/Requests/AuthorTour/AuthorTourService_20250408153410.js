import * as fs from 'fs';
import * as path from 'path';
import User from '../Users/User.js';

import AuthorTour from './AuthorTour.js';

class AuthorTourService {
  async AuthorTour(AuthorTourData) {
    const tour = new AuthorTour(AuthorTourData);
    await tour.save();
    return tour;
  }

  async getAuthorTours(req) {
    const { search = '', filter, region = '', userID = '' } = req.query;

    const modelFilter = {
      tourTitle: { $regex: search, $options: 'i' },
      region: { $regex: region, $options: 'i' },
      authorId: { $regex: userID, $options: 'i' },
    };

    const totalCount = await AuthorTour.countDocuments(modelFilter).exec();
    const authorTours = await AuthorTour.find(modelFilter).sort(filter).exec();

    // Получаем пользователей с полем likes
    const users = await User.find({}, 'likes').exec();

    // Подсчитываем лайки
    const likesMap = {};
    users.forEach((user) => {
      user.likes.forEach((likeId) => {
        likesMap[likeId] = (likesMap[likeId] || 0) + 1;
      });
    });

    // Добавляем likesCount к каждому туру
    const toursWithLikes = authorTours.map((tour) => ({
      ...tour._doc,
      likesCount: likesMap[tour._id] || 0,
    }));

    return { totalCount, authorTour: toursWithLikes };
  }

  async updateOneAuthorTour(id, tourData, photoPaths) {
    if (tourData.photosToDelete) {
      const pathToFile = path.resolve(
        'static',
        JSON.parse(tourData.photosToDelete)[0]
      );
      if (!fs.existsSync(pathToFile)) return;
      fs.unlinkSync(pathToFile);
    }

    if (photoPaths.length > 0) {
      const updatedTour = await AuthorTour.findByIdAndUpdate(
        id,
        {
          $set: tourData,
          $push: { photos: { $each: photoPaths } },
        },
        { new: true, runValidators: true }
      );
      return updatedTour;
    }
    const updatedTour = await AuthorTour.findByIdAndUpdate(
      id,
      { $set: tourData },
      { new: true, runValidators: true }
    );
    return updatedTour;
  }

  async getOneAuthorTour(id) {
    if (!id) {
      throw new Error('не указан ID');
    }
    const getOneAuthorTour = await AuthorTour.findById(id);
    return getOneAuthorTour;
  }

  async deleteAuthorTour(id) {
    try {
      const tour = await AuthorTour.findById(id);

      if (!tour) {
        throw new Error('не указан ID');
      }

      tour.photos.forEach((photo) => {
        const pathToFile = path.resolve('static', photo);
        if (!fs.existsSync(pathToFile)) return;
        fs.unlinkSync(pathToFile);
      });

      const deleteAuthorTour = await AuthorTour.findByIdAndDelete(id);

      return { message: 'Тур успешно удален', deleteAuthorTour };
    } catch (e) {
      return { message: e.message };
    }
  }

  async changeMainImg(imgData) {
    const { id, mainImgPath } = imgData;

    try {
      const changeMainImg = await AuthorTour.findByIdAndUpdate(
        id,
        { mainPhoto: mainImgPath },
        { new: true, upsert: true }
      );
      return changeMainImg;
    } catch (error) {
      throw new Error(`Error updating AuthorTour: ${error.message}`);
    }
  }
}

export default new AuthorTourService();
