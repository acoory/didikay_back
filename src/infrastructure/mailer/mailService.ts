const nodemailer = require('nodemailer');
import dotenv from "dotenv";
import Handlebars from "handlebars";
import ejs from 'ejs';
dotenv.config();

type EmailConfirmationData = {
    client: string,
    date: string;
    code: string;
    cancelUrl: string;
    services: any;
    // hour: string;
    // location: string;
}


class mailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT as string),
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
    }

    async sendMailConfirmation(to: string, subject: string, message: string, data: EmailConfirmationData) {
        try {

            var html = await ejs.renderFile('/usr/src/app/src/infrastructure/mailer/mailtemplates/confirmationEmailTemplate.ejs', data);

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

    async sendMailConfirmationPrestataire(to: string, subject: string, message: string, data: EmailConfirmationData) {
        try {

            var html = await ejs.renderFile('/usr/src/app/src/infrastructure/mailer/mailtemplates/confirmEmailForPrestataire.ejs', data);

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

    async sendCancelClient(to: string, subject: string, message: string, data: any) {
        try {

            var html = await ejs.renderFile('/usr/src/app/src/infrastructure/mailer/mailtemplates/ConfirmCancelClient.ejs', data);

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

    async sendCancelPrestataire(to: string, subject: string, message: string, data: any) {
        try {

            var html = await ejs.renderFile('/usr/src/app/src/infrastructure/mailer/mailtemplates/ConfirmCancelPrestataire.ejs', data);

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