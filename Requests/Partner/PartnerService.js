import * as fs from "fs";
import * as path from "path";

import Partner from "./Partner.js";

class PartnerService {
  async Partner(PartnerData) {
    const partner = new Partner(PartnerData);
    await partner.save();
    return partner;
  }

  async getPartner(req, res) {
    const totalCount = await Partner.countDocuments().exec();
    const partner = await Partner.find().exec();

    return { totalCount, partner };
  }

  async updateOnePartner(id, data, imgPaths) {
    if (data.imgToDelete) {
      const pathToFile = path.resolve(
        "static",
        JSON.parse(data.imgToDelete)[0]
      );
      if (!fs.existsSync(pathToFile)) return;
      fs.unlinkSync(pathToFile);
    }

    if (imgPaths.length > 0) {
      const updatedPartner = await Partner.findByIdAndUpdate(
        id,
        {
          $set: data,
          $push: { img: { $each: imgPaths } },
        },
        { new: true, runValidators: true }
      );
      return updatedPartner;
    } else {
      const updatedPartner = await Partner.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      );
      return updatedPartner;
    }
  }

  async getOnePartner(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const getOnePartner = await Partner.findById(id);
    return getOnePartner;
  }

  async deletePartner(id) {
    try {
      const partner = await Partner.findById(id);

      if (!partner) {
        throw new Error("не указан ID");
      }

      partner.img.forEach((img) => {
        const pathToFile = path.resolve("static", img);
        if (!fs.existsSync(pathToFile)) return;
        fs.unlinkSync(pathToFile);
      });

      const deletePartner = await Partner.findByIdAndDelete(id);

      return { message: "Партнёр успешно удален", deletePartner };
    } catch (e) {
      return { message: e.message };
    }
  }
}

export default new PartnerService();
