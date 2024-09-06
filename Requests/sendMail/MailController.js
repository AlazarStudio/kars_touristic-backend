import nodemailer from 'nodemailer';
import path from 'path'; 
import fs from 'fs';

// Контроллер для отправки писем
class MailController {
    static async sendEmail_file(req, res) {
        const { to, subject, text, html } = req.body;
        const filePath = path.join(process.cwd(), 'templates', 'VOUCHER-tour-template.docx');

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
            html,
            attachments: [{
                filename: 'VOUCHER-hotel.docx',
                path: filePath
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
