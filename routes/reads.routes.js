let readsModel = require("../models/reads");

module.exports = (app) => {

    app.post("/api/reads/new", async (req, res) => {
        try {

            let read = new readsModel(req.body);
            await read.save();
            res.json({ message: "New read was successfully saved!" });

        } catch (error) {
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

        let { id } = req.body;

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