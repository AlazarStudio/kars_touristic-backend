import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

// Контроллер для отправки писем
class MailController {
  static async sendEmail_file(req, res) {
    function formatDateRange(dateRange) {
      if (!dateRange) return "";

      const [startDate, endDate] = dateRange.split(" - ");

      const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
      };

      const formattedStartDate = formatDate(startDate);

      if (endDate) {
        const formattedEndDate = formatDate(endDate);
        return `${formattedStartDate} - ${formattedEndDate}`;
      } else {
        return formattedStartDate;
      }
    }

    function formatDate(dateStr) {
      const date = new Date(dateStr);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0, поэтому добавляем 1
      const year = date.getFullYear();

      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }

    const { formData } = req.body;

    let dogovorTags = {
      items: formData.passengers,
      bron_id: formData.bookingInfo._id,

      client_fio: formData.passengers[0].name,
      client_address: formData.passengers[0].address,
      client_series: formData.passengers[0].passportSeries,
      client_number: formData.passengers[0].passportNumber,
      client_phone: formData.passengers[0].phone,
      client_email: formData.passengers[0].email,

      dateStart: formatDateRange(formData.bookingDate).split(" - ")[0],
      dateEnd: formatDateRange(formData.bookingDate).split(" - ")[1],

      tourName: formData.tours[0].tourTitle,
      duration: formData.tours[0].duration,
      tourStartPlace:
        formData.tours[0].tourStartPlace || formData.tours[0].places[0],

      paymentNumber: formData.paymentNumber,
      paymentDate: formatDate(formData.bookingInfo.createdAt),
      paymentType: formData.paymentType == "card" ? "Карта" : "Наличные",
      price: formData.price,
      checklists: formData.tours[0].checklists.join(", "),
    };

    const templateName = path.join(
      process.cwd(),
      "templates",
      "VOUCHER-tourAgent-template.docx"
    );
    const templateContent = fs.readFileSync(templateName, "binary");

    const filename = `VOUCHER для тура ${formData.tours[0].tourTitle} - ${formData.passengers[0].name}.docx`;

    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater(zip, {
      nullGetter(part) {
        if (part.value === undefined) {
          return "";
        }
        return part.value;
      },
    });

    doc.setData(dogovorTags);

    try {
      doc.render();
      const output = doc.getZip().generate({ type: "nodebuffer" });

      const filePath = `static/${filename}`;

      fs.writeFileSync(filePath, output);
    } catch (error) {
      console.error("Ошибка при создании документа:", error);
      return res.status(500).send("Ошибка при создании документа");
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "kars-touristic@mail.ru",
        pass: "GdWjd18aAKsNuBevXE0u",
      },
    });

    const filePathEmail = path.join(process.cwd(), "static", filename);

    let mailOptions = {
      from: "kars-touristic@mail.ru",
      to: formData.passengers[0].email,
      subject: `Информация об оплате тура ${formData.tours[0].tourTitle}`,
      text: `karstouristic.ru`,
      html: `Вами был приобретен тур ${formData.tours[0].tourTitle} на сумму <b>${formData.price} рублей</b>. <br/> 
                Дата прохождения тура:  <b>${formData.bookingDate}</b> <br/> 
                Подробная информация содержится в прикрепленном документе.`,
      attachments: [
        {
          filename: filename,
          path: filePathEmail,
        },
      ],
    };

    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Письмо отправлено: " + info.response);
      res
        .status(200)
        .json({ message: "Письмо успешно отправлено", info: info.response });
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
      res
        .status(500)
        .json({
          message: "Ошибка при отправке письма",
          error: error.toString(),
        });
    }
  }

  static async sendEmail_file_hotel(req, res) {
    function formatDateRange(dateRange) {
      if (!dateRange) return "";

      const [startDate, endDate] = dateRange.split(" - ");

      const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
      };

      const formattedStartDate = formatDate(startDate);

      if (endDate) {
        const formattedEndDate = formatDate(endDate);
        return `${formattedStartDate} - ${formattedEndDate}`;
      } else {
        return formattedStartDate;
      }
    }

    function formatDate(dateStr) {
      const date = new Date(dateStr);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0, поэтому добавляем 1
      const year = date.getFullYear();

      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }

    const { formData } = req.body;

    let dogovorTags = {
      bron_id: formData.bookingInfo._id,

      client_fio: formData.client[0].name,
      client_address: formData.client[0].address,
      client_series: formData.client[0].passportSeries,
      client_number: formData.client[0].passportNumber,
      client_phone: formData.client[0].phone,
      client_email: formData.client[0].email,

      dateStart: formatDateRange(formData.arrivalDate),
      dateEnd: formatDateRange(formData.departureDate),

      hotelName: formData.hotel.title,
      address: formData.hotel.adress,
      roomNumber: formData.roomNumber ? formData.roomNumber : "-",
      dopServices: formData.hotel.moreInfo,

      paymentNumber: formData.paymentNumber,
      paymentDate: formatDate(formData.bookingInfo.createdAt),
      paymentType: formData.paymentType == "card" ? "Карта" : "Наличные",
      price: formData.fullPrice,
      checklists: formData.hotel.description,
    };

    const templateName = path.join(
      process.cwd(),
      "templates",
      "VOUCHER-hotel-template.docx"
    );
    const templateContent = fs.readFileSync(templateName, "binary");

    const filename = `VOUCHER для отеля ${formData.hotel.title} - ${formData.client[0].name}.docx`;

    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater(zip, {
      nullGetter(part) {
        if (part.value === undefined) {
          return "";
        }
        return part.value;
      },
    });

    doc.setData(dogovorTags);

    try {
      doc.render();
      const output = doc.getZip().generate({ type: "nodebuffer" });

      const filePath = `static/${filename}`;

      fs.writeFileSync(filePath, output);
    } catch (error) {
      console.error("Ошибка при создании документа:", error);
      return res.status(500).send("Ошибка при создании документа");
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "kars-touristic@mail.ru",
        pass: "GdWjd18aAKsNuBevXE0u",
      },
    });

    const filePathEmail = path.join(process.cwd(), "static", filename);

    let mailOptions = {
      from: "kars-touristic@mail.ru",
      to: formData.client[0].email,
      subject: `Информация о бронировании номер ${formData.roomNumber} в отеле ${formData.hotel.title}`,
      text: `karstouristic.ru`,
      html: `Вами был забронирован номер ${formData.roomNumber} в отеле ${
        formData.hotel.title
      } на сумму <b>${formData.fullPrice} рублей</b>. <br/> 
                Даты бронирования:  <b>${formatDateRange(
                  formData.arrivalDate
                )} - ${formatDateRange(formData.departureDate)}</b> <br/> 
                Подробная информация содержится в прикрепленном документе.`,
      attachments: [
        {
          filename: filename,
          path: filePathEmail,
        },
      ],
    };

    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Письмо отправлено: " + info.response);
      res
        .status(200)
        .json({ message: "Письмо успешно отправлено", info: info.response });
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
      res
        .status(500)
        .json({
          message: "Ошибка при отправке письма",
          error: error.toString(),
        });
    }
  }

  static async sendEmail(req, res) {
    const { to, subject, text, html } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "kars-touristic@mail.ru",
        pass: "GdWjd18aAKsNuBevXE0u",
      },
    });

    let mailOptions = {
      from: "kars-touristic@mail.ru",
      to,
      subject,
      text,
      html,
    };

    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Письмо отправлено: " + info.response);
      res
        .status(200)
        .json({ message: "Письмо успешно отправлено", info: info.response });
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
      res
        .status(500)
        .json({
          message: "Ошибка при отправке письма",
          error: error.toString(),
        });
    }
  }
}

export default MailController;
