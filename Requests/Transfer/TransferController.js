import TransferService from "./TransferService.js";

class TransferController {
  async transfer(req, res) {
    try {
      const { body } = req;

      const transfer = await TransferService.transfer({
        ...body,
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

  async updateTransfer(req, res) {
    try {
      const { body } = req;
      const updateTransfer = await TransferService.updateTransfer(
        req.params.id,
        { ...body }
      );
      res.status(200).send(updateTransfer);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось обновить данные", error: error.message });
    }
  }

  async deleteTransfer(req, res) {
    try {
      const deleteTransfers = await TransferService.deleteTransfer(
        req.params.id
      );
      return res.status(200).json(deleteTransfers);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new TransferController();
