import AboutService from "./AboutService.js";

class AboutController {
  async aboutCompany(req, res) {
    try {
      const about = await AboutService.aboutCompany(req.query);

      res.status(201).send(about);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }

  async getAboutCompany(req, res) {
    try {
      const about = await AboutService.getAboutCompany();
      res.status(200).send(about);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось получить данные", error: error.message });
    }
  }

  async mission(req, res) {
    try {
      const about = await AboutService.mission(req.query);

      res.status(201).send(about);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }

  async getMission(req, res) {
    try {
      const mission = await AboutService.getMission();
      res.status(200).send(mission);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось получить данные", error: error.message });
    }
  }

  async team(req, res) {
    try {
      const { name, description } = req.body;
      const { imgPath } = req.files;

      if (!imgPath) {
        return res
          .status(400)
          .send({ message: "Необходимо прикрепить файлы imgPath" });
      }

      const team = await AboutService.team({
        name,
        description,
        imgPath: imgPath[0],
      });

      res.status(201).send(team);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }

  async getTeam(req, res) {
    try {
      const team = await AboutService.getTeam();
      res.status(200).send(team);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось получить данные", error: error.message });
    }
  }

  async deleteTeam(req, res) {
    try {
      const deleteTeam = await AboutService.deleteTeam(req.params.id);
      return res.status(200).json(deleteTeam);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  // transfer
  async transferInfo(req, res) {
    try {
      const { files, body } = req;
      const imgPath = files.images.map((file) => file.filename);
      const data = {...body, imgPath}
      const about = await AboutService.transferInfo(data);

      res.status(201).send(about);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }

  async getTransferInfo(req, res) {
    try {
      const about = await AboutService.getTransferInfo();
      res.status(200).send(about);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось получить данные", error: error.message });
    }
  }

  // faq
  async faqInfo(req, res) {
    try {
      const { files, body } = req;
      const imgPath = files.images || [];
      const data = { ...body, imgPath };
      const about = await AboutService.faqInfo(data);

      res.status(201).send(about);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось добавить", error: error.message });
    }
  }

  async getFaqInfo(req, res) {
    try {
      const about = await AboutService.getFaqInfo();
      res.status(200).send(about);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Не удалось получить данные", error: error.message });
    }
  }
}

export default new AboutController();
