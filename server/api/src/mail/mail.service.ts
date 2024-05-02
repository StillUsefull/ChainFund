import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
@Injectable()
export class MailService {
    constructor(){
        sgMail.setApiKey(process.env.EMAIL_API_KEY)
    }
    async sendApprovedRequest(email, password){
        const data: sgMail.MailDataRequired = {
            to: email,
            subject: 'Approval for becoming Creator on ChainFund',
            from: 'testsendet1@gmail.com',
            text: `To start your journey as the Creator on our website: email - ${email}, password - ${password}. After logging in, you can change your password`
        }

        const transport = await sgMail.send(data);
        return transport;
    }

    async sendDeclineRequest(email){
        const data: sgMail.MailDataRequired = {
            to: email,
            subject: 'Rejection of an application for a creator',
            from: 'testsendet1@gmail.com',
            text: `Sorry, but we can\`t aprove your request to become Creator. Contact email - dedmack6@gmail.com.`
        }
        const transport = await sgMail.send(data);
        return transport;
    }
}
