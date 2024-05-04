const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendVerifyEmail(targetEmail, content) {
    const message = {
      from: 'anis000romzi@gmail.com',
      to: targetEmail,
      subject: 'Verify your Open Music account!',
      text: `
      Hey there ~

      Your verification code is: ${content}.
      Please verify the account within 30 minutes.

      Thanks! 
      
      This is an automated email. Please do not reply to this email.`,
      html: `
      <p>Hey there ~</p>
      <br>
      <p>Your verification code is: <b>${content}</b></p>
      <p>Please verify the account within 30 minutes.</p>
      <br>
      <p>Thanks!</p>
      <br>
      <em>This is an automated email. Please do not reply to this email.</em>
      `,
    };

    return this._transporter.sendMail(message);
  }

  sendResetPasswordEmail(targetEmail, content) {
    const message = {
      from: 'anis000romzi@gmail.com',
      to: targetEmail,
      subject: 'Password Reset - Open Music',
      text: `
      Hello, ${content.username}

      Your password reset code is: ${content.otp}.
      Please complete the process within 30 minutes.

      If you didn't request this reset, please ignore this email.

      Thanks! 
      
      This is an automated email. Please do not reply to this email.`,
      html: `
      <p>Hello, ${content.username}</p>
      <br>
      <p>Your password reset code is: <b>${content.otp}</b></p>
      <p>Please complete the process within 30 minutes.</p>
      <br>
      <p>If you didn't request this reset, please ignore this email.</p>
      <br>
      <p>Thanks!</p>
      <br>
      <em>This is an automated email. Please do not reply to this email.</em>
      `,
    };

    return this._transporter.sendMail(message);
  }

  sendExportEmail(targetEmail, content) {
    const message = {
      from: 'Open Music',
      to: targetEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
