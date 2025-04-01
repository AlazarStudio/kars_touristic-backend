import TransferService from "./TransferService.js";

class TransferController {
  async transfer(req, res) {
    try {
      const { body } = req;

      const transfer = await TransferService.transfer({
        body,
      });

      res.status(201).send(transfer);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }

  async getTransfer(req, res) {
    try {
      const getTransfer = await TransferService.getTransfer();
      res.status(200).send(getTransfer);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось получить данные", error: error.message });
    }
  }
}

export default new TransferController();
