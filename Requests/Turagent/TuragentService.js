import Turagent from "./Turagent.js";

class TuragentService {
  async turagent(turagentData) {
    const { description, docPath } = turagentData;

    const docPathName = docPath ? docPath.filename : "";

    const turagent = await Turagent.findOneAndUpdate(
      {},
      {
        description,
        docPath: docPathName,
      },
      { new: true, upsert: true }
    );
    return turagent;
  }

  async getTuragent() {
    try {
      const turagent = await Turagent.findOne({});
      return turagent;
    } catch (error) {
      throw new Error("Error getting Turagent: " + error.message);
    }
  }
}

export default new TuragentService();
