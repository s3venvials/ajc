let nodemailer = require("nodemailer");

const sendEmail = (message) => {
  return new Promise((resolve, reject) => {
    nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          type: "OAuth2",
          user: "averagejoecoding1@gmail.com",
          clientId: "38397246848-jekob5j4160stg43j9o0coqd5ju2lb6l.apps.googleusercontent.com",
          clientSecret: "512Z1V-vazunvgtOdXWxLpQn",
          refreshToken: "1//04vS8t2Xq8MQnCgYIARAAGAQSNwF-L9Ir8h04qsRA8E6dgJVeCukPTFp3-eLu9VJg9g6bdaVL0YF_b1IJO5oicX-f5fwCxlvPAok",
          accessToken: "ya29.a0AfH6SMDyAfBRL04brXYUew94Ne-wP8G6UHItj0jX6y6ipLzqWyfrkNAwhbgK8Iq0ljDBTKS2Gd7Bxwt33QCnTkiSYYcOeSav-LBXFjPoFOZQENgpDS8DiCojAaenTUWEHcrko888VBIza_Q3pn0Y3eESbh4Hzkhn71I",
          expires: 3599
        }
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