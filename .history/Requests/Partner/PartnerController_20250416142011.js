import PartnerService from './PartnerService.js';

import Partner from './Partner.js';

class PartnerController {
  async Partner(req, res) {
    try {
      const { files, body } = req;
      const imgPaths = files?.img?.map((file) => file.filename) || [];

      const PartnerData = {
        ...body,
        img: imgPaths,
      };

      const partner = await PartnerService.Partner(PartnerData);
      res.status(201).json(partner);
    } catch (error) {
      console.error('Error in PartnerController:', error);
      res
        .status(500)
        .json({ message: 'Error adding Partner', error: error.message });
    }
  }

  async updateOnePartner(req, res) {
    const { id } = req.params;
    const data = req.body;
    let imgPaths = [];

    if (req.files && req.files.imgs) {
      imgPaths = req.files.imgs.map((file) => file.filename);
    }

    try {
      const updatedPartner = await PartnerService.updateOnePartner(
        id,
        data,
        imgPaths
      );
      res.status(200).json(updatedPartner);
    } catch (error) {
      console.error(`Ошибка в updateOnePartner: ${error}`);
      res.status(500).json({ message: 'Ошибка при обновлении партнёра' });
    }
  }

  async getPartner(req, res) {
    try {
      const getPartner = await PartnerService.getPartner(req);
      return res.status(201).json(getPartner);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getOnePartner(req, res) {
    try {
      const getOnePartner = await PartnerService.getOnePartner(req.params.id);
      return res.status(200).json(getOnePartner);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deletePartner(req, res) {
    try {
      const deletePartner = await PartnerService.deletePartner(req.params.id);
      return res.status(200).json(deletePartner);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PartnerController();
