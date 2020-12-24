const {
  createUser,
  loginUser,
  getUser,
  logoutUser,
  createSub,
} = require("../modules");
const { sendEmail } = require("../utils");
const keys = require("../config/keys");
const { verifyEmailNotification, feedBackNotification } = require("../modules/email/templates");
const { UserModel } = require("../models/user.model");
const { generateId } = require("../utils");
const { SubModel } = require("../models/subs.model");

/**
 * User API
 * @param {import("express").Express} app
 */
module.exports = (app) => {
  app.post("/api/user/signup", async (req, res) => {
    try {
      const passCode = generateId(6).toUpperCase();
      let response = await createUser(req.body, passCode);
      if (response.User)
        await sendEmail(
          verifyEmailNotification(keys.emailSender, req.body.email, passCode)
        );
      return res.json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/api/user/signin", async (req, res) => {
    try {
      let response = await loginUser(req.body);
      return res.json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/api/user/current", async (req, res) => {
    try {
      const sessionId = req.query.sessionId;
      let response = await getUser(sessionId);
      return res.json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/api/user/signout", async (req, res) => {
    try {
      const sessionId = req.query.sessionId;
      let response = await logoutUser(sessionId);
      return res.json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/api/user/email_verification", async (req, res) => {
    try {
      const { email } = req.body;
      const passCode = generateId(6).toUpperCase();
      const users = await UserModel.find({});
      let response;

      for (let i = 0; i < users.length; i++) {
        if ((email.toLowerCase(), users[i].username)) {
          await UserModel.updateOne({ _id: users[i]._id }, { passCode });
          response = await sendEmail(
            verifyEmailNotification(keys.emailSender, email, passCode)
          );
          break;
        }
      }

      return res.json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/api/user/verify_email", async (req, res) => {
    let response = { Message: null, Error: null };

    try {
      const { passCode } = req.body;
      const updateRes = await SubModel.updateOne(
        { passCode },
        { passCode: "", isVerified: true }
      );
      updateRes.nModified === 1
        ? (response.Message = "Your email has been successfully verified!")
        : (response.Error = "The provided pass code does not exist.");
      return res.json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/api/user/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      const createSubRes = await createSub(email);
      return res.json(createSubRes);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/api/user/unsubscribe", async (req, res) => {
    try {
      const { id, response, other } = req.body;

      await SubModel.findByIdAndDelete({ _id: id });
      await sendEmail(feedBackNotification(keys.emailSender, keys.emailSender, response, other));
      
      return res.json();
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
