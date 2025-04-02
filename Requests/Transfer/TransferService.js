import Transfer from "./Transfer.js";

class TransferService {
  async transfer(transferData) {
    const transfer = new Transfer(transferData);
    await transfer.save();
    return transfer;
  }

  async getTransfer() {
    try {
      const transfer = await Transfer.find({});
      return transfer;
    } catch (error) {
      throw new Error("Ошибка при получении трансфера: " + error.message);
    }
  }

  async updateTransfer(id, transferData) {
    try {
      const updatedTransfer = await Transfer.findByIdAndUpdate(id, transferData, { new: true });
      return updatedTransfer;
    } catch (error) {
      throw new Error("Ошибка при изменении трансфера: " + error.message);
    }
  }

  async deleteTransfer(id) {
    try {
      const deleteTransfer = await Transfer.findByIdAndDelete(id);

      return { message: "Трансфер успешно удален", deleteTransfer };
    } catch (e) {
      return { message: e.message };
    }
  }
}

export default new TransferService();
