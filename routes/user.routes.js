const { createUser } = require("../modules/createUser");

module.exports = (app) => {
    app.post("/api/user/signup", async (req, res) => {
        try {
            let res = await createUser(req.body);
            res.json(res);
        } catch (error) {
            res.status(500).json(error);
        }
    });
}