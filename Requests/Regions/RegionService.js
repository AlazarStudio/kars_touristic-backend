import Region from "./Region.js";
import { transliterate } from "transliteration";
import * as fs from "fs";
import * as path from "path";

class RegionService {
  async addRegion(regionData) {
    const {
      title,
      description,
      descriptionSecond,
      iconPath,
      coverImgPath,
      backgroundImgPath,
    } = regionData;

    const iconPathName = iconPath ? iconPath.filename : "";
    const coverImgPathName = coverImgPath ? coverImgPath.filename : "";
    const backgroundImgPathName = backgroundImgPath
      ? backgroundImgPath.filename
      : "";
    const link = transliterate(title);

    const region = new Region({
      title,
      description,
      descriptionSecond,
      iconPath: iconPathName,
      coverImgPath: coverImgPathName,
      backgroundImgPath: backgroundImgPathName,
      link,
    });

    await region.save();
    return region;
  }

  async getRegions(req) {
    const regions = await Region.find();
    return { regions };
  }

  async getOneRegion(link) {
    if (!link) {
      throw new Error("не указан ID");
    }
    const getOneRegion = await Region.findOne({ link: link });
    return getOneRegion;
  }

  async deleteRegion(id) {
    try {
      const deleteRegion = await Region.findByIdAndDelete(id);

      return { message: "Успешно удален", deleteRegion };
    } catch (e) {
      return { message: e.message };
    }
  }

  async updateRegion(id, regionData, regionPhotos) {
    try {
      const existingRegion = await Region.findOne({ _id: id });
      if (!existingRegion) {
        throw new Error("Регион не найден");
      }

      const deleteFileIfExists = (filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      };

      if (regionPhotos.iconPath && existingRegion.iconPath.length > 0) {
        existingRegion.iconPath.forEach((file) => {
          const pathToFile = path.resolve("static", file);
          deleteFileIfExists(pathToFile);
        });
      }

      if (regionPhotos.coverImgPath && existingRegion.coverImgPath.length > 0) {
        existingRegion.coverImgPath.forEach((file) => {
          const pathToFile = path.resolve("static", file);
          deleteFileIfExists(pathToFile);
        });
      }

      if (
        regionPhotos.backgroundImgPath &&
        existingRegion.backgroundImgPath.length > 0
      ) {
        existingRegion.backgroundImgPath.forEach((file) => {
          const pathToFile = path.resolve("static", file);
          deleteFileIfExists(pathToFile);
        });
      }

      const updateData = { ...regionData, ...regionPhotos };

      const updatedRegion = await Region.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      return updatedRegion;
    } catch (error) {
      console.error(`Ошибка в Service updateRegion: ${error.message}`);
      throw error;
    }
  }
}

export default new RegionService();
