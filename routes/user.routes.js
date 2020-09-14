const { createUser, loginUser, getUser, logoutUser, sendEmailConfirmation, createSub, verifyEmail } = require("../modules");
const keys = require("../config/keys");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs")

module.exports = (app) => {
    app.post("/api/user/signup", async (req, res) => {
        try {
            let response = await createUser(req.body);
            if (response.User) await sendEmailConfirmation(keys.nodeMailer.sender, req.body.email, response.User._id);
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
            const users = await UserModel.find({});
            let id;

            for (let i = 0; i < users.length; i++) {
                if (bcrypt.compareSync(email.toLowerCase(), users[i].username)) {
                    id = users[i]._id;
                    break;
                }
            }
            
            let response = await sendEmailConfirmation(keys.nodeMailer.sender, email, id);
            return res.json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    })

    app.get("/api/user/verify_email", async (req, res) => {
        try {
            const { id } = req.query;
            let response = await verifyEmail(id);
            return res.json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    app.post("/api/user/subscribe", async (req, res) => {
        try {
            const { email } = req.body;
            let response = await createSub(email);
            return res.json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    })
}