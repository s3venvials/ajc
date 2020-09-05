const { createUser } = require("../modules/createUser");
const { sendEmailConfirmation } = require("../modules/email");
const keys = require("../config/keys");

module.exports = (app) => {
    app.post("/api/user/signup", async (req, res) => {
        try {
            let response = await createUser(req.body);
            if (response.Message) await sendEmailConfirmation(keys.nodeMailer.sender, req.body);
            return res.json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    app.get("/api/user/verify", (req, res) => {
        res.json("Test success");
    });
}