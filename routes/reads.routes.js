let readsModel = require("../models/reads.model");
const multer = require("multer");
const upload = multer();
const fs = require("fs")
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports = (app) => {

    app.post("/api/reads/new", upload.single("file"), async (req, res) => {
        try {

            const { file, body: { title, category, name, content, imageUrl }} = req;
            let fileName = "";
            let imgPath = "";

            if (file) {

                 fileName = name + file.detectedFileExtension;

                 await pipeline(
                    file.stream,
                    fs.createWriteStream(`${__dirname}/../client/public/uploads/${fileName}`)
                )

                imgPath = `/uploads/${fileName}`;
            }

            let categories = category.split(",");
            let reads = {
                title,
                category: categories,
                content,
                imgPath,
                imageUrl
            }

            let read = new readsModel(reads);
            await read.save();

            return res.json({ message: "Reads was added successfully!" });

        } catch (error) {
            console.log(error);
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

            if (isRandom) postCount = Math.floor(Math.random() * allReads.length) + 1;

            if (postCount > 0) {
                for (var i = 0; i < allReads.length; i++) {
                    reads.push(allReads[i]);
                    if (i === postCount - 1) break;
                }   
            }

            res.json(reads);

        } catch (error) {
            res.status(500).json(error);
        }
    });

}