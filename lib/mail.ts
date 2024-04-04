import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)


export const sendVerficationMail = async (email:string,token:string) =>{

    const confirmLink = `${process.env.DOMAIN}/new-verification?token=${token}`

    await resend.emails.send({
        from: "tushar@prod-enh.online",
        to: email,
        subject: "Confirm your email",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            }
            h1 {
              color: #333333;
              text-align: center;
            }
            p {
              color: #666666;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
            .btn:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Thank You for Signing Up!</h1>
            <p>We're excited to have you on board. To complete your registration, please click the button below.</p>
            <p>If you did not sign up for this service, you can ignore this email.</p>
            <p><a href="${confirmLink}" class="btn">Confirm Email</a></p>
            <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
            <p>https://www.prod-enh.online/confirm_email</p>
            <p>Thank you,<br>Your Company Name</p>
          </div>
        </body>
        </html>
        `
    })

}