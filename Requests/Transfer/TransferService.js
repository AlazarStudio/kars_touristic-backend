import Transfer from "./Transfer.js";

class TransferService {
  async transfer(transferData) {
    const transfer = new Transfer(transferData);
    await transfer.save();
    return transfer;
  }

  async getTransfer() {
    try {
      const transfer = await Transfer.findMany({});
      return transfer;
    } catch (error) {
      throw new Error("Error getting aboutCompany: " + error.message);
    }
  }
}

export default new TransferService();
