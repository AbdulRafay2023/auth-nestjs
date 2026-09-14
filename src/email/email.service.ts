import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {

    private resend = new Resend(process.env.RESEND_API_KEY);


    async sendOtpEmail(email:string, otp:string){
       const {data, error} = await this.resend.emails.send({
        from: "onboarding@resend.dev",
        to: [email],
        subject: "Your Otp Code",
        html:`
         <h2>OTP Verification</h2>

        <p>Your OTP code is: ${otp}</p>

        <p>This OTP will expire in 5 minutes.</p>

        <p>If you did not request this OTP, please ignore this email.</p>
         
        `,
       });

       if(error){
        console.log('Resend Error:', error)
        throw new Error('Failed to send otp email')
       }

       console.log('Email Send:', data)
       return data
    }
}
