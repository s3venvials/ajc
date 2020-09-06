const { createUser, loginUser, getUser, logoutUser, sendEmailConfirmation } = require("../modules");
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

    app.get("/api/user/verify", (req, res) => {
        res.json("Test success");
    });
}