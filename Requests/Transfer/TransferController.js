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
    const { id } = req.params;
    let transferData = req.body;

    try {
      const updateTransfer = await TransferService.updateTransfer(
        id,
        transferData
      );
      res.status(200).json(updateTransfer);
    } catch (error) {
      console.error(`Ошибка в updateTransfer: ${error}`);
      res.status(500).json({ message: "Ошибка при обновлении" });
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
