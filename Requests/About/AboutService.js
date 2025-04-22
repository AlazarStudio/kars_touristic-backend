import AboutCompany from "./AboutCompany.js";
import Mission from "./Mission.js";
import Team from "./Team.js";
import * as fs from "fs";
import * as path from "path";
import TransferInfo from "./TransferInfo.js";
import FaqInfo from "./FaqInfo.js";

class AboutService {
  async aboutCompany(aboutData) {
    const { aboutCompany } = aboutData;

    try {
      const updatedAbout = await AboutCompany.findOneAndUpdate(
        {},
        { aboutCompany },
        { new: true, upsert: true }
      );
      return updatedAbout;
    } catch (error) {
      throw new Error("Error updating aboutCompany: " + error.message);
    }
  }

  async getAboutCompany() {
    try {
      const about = await AboutCompany.findOne({});
      return about;
    } catch (error) {
      throw new Error("Error getting aboutCompany: " + error.message);
    }
  }

  async mission(aboutData) {
    const { mission } = aboutData;

    try {
      const updatedMission = await Mission.findOneAndUpdate(
        {},
        { mission },
        { new: true, upsert: true }
      );
      return updatedMission;
    } catch (error) {
      throw new Error("Error updating mission: " + error.message);
    }
  }

  async getMission() {
    try {
      const mission = await Mission.findOne({});
      return mission;
    } catch (error) {
      throw new Error("Error getting mission: " + error.message);
    }
  }

  async team(aboutData) {
    const { name, description, imgPath } = aboutData;

    const imgPathName = imgPath ? imgPath.filename : "";

    const team = new Team({
      name,
      description,
      imgPath: imgPathName,
    });

    await team.save();
    return team;
  }

  async getTeam() {
    try {
      const team = await Team.find();
      return team;
    } catch (error) {
      throw new Error("Error getting mission: " + error.message);
    }
  }

  async deleteTeam(id) {
    try {
      // const team = await Team.findById(id);

      // if (!team) {
      //     throw new Error("не указан ID");
      // }

      // const pathToFile = path.resolve('static', team.imgPath)
      // if (!fs.existsSync(pathToFile)) return;
      // fs.unlinkSync(pathToFile);

      const deleteTeam = await Team.findByIdAndDelete(id);

      return { message: "Успешно удален" };
    } catch (e) {
      return { message: e.message };
    }
  }

  // transfer

  async transferInfo(data) {
    const { description } = data;

    console.log("\n description: " + JSON.stringify(data))

    try {
      const updatedTransfer = await TransferInfo.findOneAndUpdate(
        {},
        { description },
        { new: true, upsert: true }
      );
      // console.log("\n updatedTransfer: " + updatedTransfer)
      // console.log("\n updatedTransfer str: " + JSON.stringify(updatedTransfer))
      return updatedTransfer;
    } catch (error) {
      throw new Error("Error updating transferInfo: " + error.message);
    }
  }

  async getTransferInfo() {
    try {
      const transfer = await TransferInfo.findOne({});
      return transfer;
    } catch (error) {
      throw new Error("Error getting transferInfo: " + error.message);
    }
  }

  // FAQ

  async faqInfo(data) {
    const { description } = data;

    try {
      const updatedFaq = await FaqInfo.findOneAndUpdate(
        {},
        { description },
        { new: true, upsert: true }
      );
      return updatedFaq;
    } catch (error) {
      throw new Error("Error updating faq: " + error.message);
    }
  }

  async getFaqInfo() {
    try {
      const faq = await FaqInfo.findOne({});
      return faq;
    } catch (error) {
      throw new Error("Error getting faq: " + error.message);
    }
  }
}

export default new AboutService();
