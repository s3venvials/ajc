let nodemailer = require("nodemailer");
const keys = require("../config/keys");

const sendEmail = (message) => {
  return new Promise((resolve, reject) => {
    nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: keys.type,
        user: keys.user,
        clientId: keys.clientId,
        clientSecret: keys.clientSecret,
        refreshToken: keys.refreshToken,
        accessToken: keys.accessToken,
        expires: 3599
    },
    }).sendMail(message, (err) => {
      if (err) reject(err);
      resolve("Done");
    });
  });
}

const generateId = (length = 8, numbers = true, alpha = true) => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (!numbers && alpha) {
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  } else if (numbers && !alpha) {
    possible = "0123456789";
  }

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

module.exports = {
  sendEmail,
  generateId
}