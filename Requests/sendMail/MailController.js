import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

// Контроллер для отправки писем
class MailController {
    static async sendEmail_file(req, res) {
        const { messData } = req.body;

        let formData = messData;

        let dogovorTags = {
            bron_id: formData.bron_id,
            
            client_fio: formData.passengers[0].name,
            client_address: formData.passengers[0].address,
            client_series: formData.passengers[0].passportSeries,
            client_number: formData.passengers[0].passportNumber,
            client_phone: formData.passengers[0].phone,
            client_email: formData.passengers[0].email,
            
            dateEnd: formData.bookingDate.split(' - ')[0],
            dateStart: formData.bookingDate.split(' - ')[1],

            tourName: formData.tours[0].tourTitle,
            duration: formData.tours[0].duration,
            tourStartPlace: formData.tours[0].tourStartPlace,

            paymentNumber: formData.paymentNumber,
            paymentDate: formData.paymentDate,
            paymentType: formData.paymentType,
            price: formData.price,
            checklists: formData.tours[0].checklists[0],
        }

        console.log(dogovorTags)

        const templateName = path.join(process.cwd(), 'templates', 'VOUCHER-tour-template.docx');
        const templateContent = fs.readFileSync(templateName, 'binary');
        
        const filename = `VOUCHER-test.docx`;

        const zip = new PizZip(templateContent);
        const doc = new Docxtemplater(zip, {
            nullGetter(part) {
                if (part.value === undefined) {
                    return "";
                }
                return part.value;
            }
        });
        
        doc.setData(dogovorTags);
        
        try {
            doc.render();
            const output = doc.getZip().generate({ type: 'nodebuffer' });
            
            const filePath = `static/${filename}`;
            
            fs.writeFileSync(filePath, output);
            
        } catch (error) {
            console.error('Ошибка при создании документа:', error);
            return res.status(500).send('Ошибка при создании документа');
        }

        
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'alimdzhatdoev@mail.ru',
                pass: 'sfQPpSa7PRb1FdSbGQR3'
            }
        });
        
        const filePathEmail = path.join(process.cwd(), 'static', filename);

        let mailOptions = {
            from: 'alimdzhatdoev@mail.ru',
            to: formData.passengers[0].email,
            subject: `Информация об оплате тура ${formData.tours[0].tourTitle}`,
            text: `karstouristic.ru`,
            html: `Вами был приобретен тур ${formData.tours[0].tourTitle} на сумму <b>${formData.price} рублей</b>. <br/> 
                Дата прохождения тура:  <b>${formData.bookingDate} рублей</b> <br/> 
                Подробная информация содержится в прикрепленном документе.`,
            attachments: [{
                filename: filename,
                path: filePathEmail
            }]
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Письмо отправлено: ' + info.response);
            res.status(200).json({ message: 'Письмо успешно отправлено', info: info.response });
        } catch (error) {
            console.error('Ошибка при отправке письма:', error);
            res.status(500).json({ message: 'Ошибка при отправке письма', error: error.toString() });
        }
    }

    static async sendEmail(req, res) {
        const { to, subject, text, html } = req.body;

        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'alimdzhatdoev@mail.ru',
                pass: 'sfQPpSa7PRb1FdSbGQR3'
            }
        });

        let mailOptions = {
            from: 'alimdzhatdoev@mail.ru',
            to,
            subject,
            text,
            html
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Письмо отправлено: ' + info.response);
            res.status(200).json({ message: 'Письмо успешно отправлено', info: info.response });
        } catch (error) {
            console.error('Ошибка при отправке письма:', error);
            res.status(500).json({ message: 'Ошибка при отправке письма', error: error.toString() });
        }
    }
}

export default MailController;
