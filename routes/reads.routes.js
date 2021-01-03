let readsModel = require("../models/reads.model");
const multer = require("multer");
const upload = multer();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { SubModel } = require("../models/subs.model");
const { sendEmail } = require("../utils");
const { newReadsNotification } = require("../modules/email/templates");
const keys = require("../config/keys");

/**
 * Reads API
 * @param {import("express").Express} app
 */
module.exports = (app) => {
  app.post("/api/reads/new", upload.single("file"), async (req, res) => {
    try {
      const {
        file,
        body: { title, category, name, content, imageUrl, code },
      } = req;
      let fileName = "";
      let imgPath = "";
      const subs = await SubModel.find({});

      if (file) {
        fileName = name + file.detectedFileExtension;

        await pipeline(
          file.stream,
          fs.createWriteStream(
            `${__dirname}/../client/public/uploads/${fileName}`
          )
        );

        imgPath = `/uploads/${fileName}`;
      }

      let categories = category.split(",");
      let reads = {
        title,
        category: categories,
        content,
        imgPath,
        imageUrl,
        code,
      };

      let read = new readsModel(reads);
      await read.save();

      for (let i = 0; i < subs.length; i++) {
        //Send out email to all subscribed users about the new reads post.
        if (subs[i].isVerified) {
          await sendEmail(
            newReadsNotification(
              keys.emailSender,
              subs[i].email,
              read,
              subs[i]._id
            )
          );
        }
      }

      return res.json({ message: "Reads was added successfully!" });
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  });

  app.get("/api/reads/all", async (req, res) => {
    try {
      let allReads = await readsModel.find({});
      res.json(allReads);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/api/reads/one", async (req, res) => {
    let { id } = req.query;

    try {
      let allReads = await readsModel.find({ _id: id });
      res.json(allReads);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/api/reads/count", async (req, res) => {
    let { postCount, isRandom } = req.body;

    try {
      let reads = [];
      let allReads = await readsModel.find({});
      
      if (isRandom) {
        const index = Math.floor(Math.random() * allReads.length) + 1;
        reads.push(allReads[index]);
        
      } else {
        if (postCount > 0) {
          for (let i = 0; i < allReads.length; i++) {
            reads.push(allReads[i]);
            if (i === postCount - 1) break;
          }
        }
      }

      res.json(reads);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  app.post("/api/reads/ratings", async (req, res) => {
    try {
      const { id, value } = req.body;
      const updateRes = await readsModel.findByIdAndUpdate({ _id: id }, value);
      return res.json(updateRes);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/api/reads/comments", async (req, res) => {
    try {
      const { id, name, message, createdDate } = req.body;
      const updateRes = await readsModel.findByIdAndUpdate(
        { _id: id },
        { $push: { comments: { name, message, createdDate } } }
      );
      return res.json(updateRes);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
