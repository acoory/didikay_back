const nodemailer = require('nodemailer');
import dotenv from "dotenv";
import Handlebars from "handlebars";
import ejs from 'ejs';
dotenv.config();

type EmailConfirmationData = {
    date: string;
    hour: string;
    location: string;
}


class mailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'joelle42@ethereal.email',
                pass: 'P8NU3VYZNaeUtR46TQ'
            }
        });
    }

    async sendMailConfirmation(to: string, subject: string, message: string, data: EmailConfirmationData) {
        try {

            var html = await ejs.renderFile('/usr/src/app/src/infrastructure/mailer/mailTemplates/confirmationEmailTemplate.ejs', data);


            const info = await this.transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to,
                subject,
                text: message,
                html: html
            });

            return info;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new mailService();