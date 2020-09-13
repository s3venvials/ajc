const { SubModel } = require("../models/subs.model");
const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/user.model");

const createSub = async (email) => {

    let response = { Message: null };

    try {

        if (!email) return;

        const subs = await SubModel.find({});

        for (let i = 0; i < subs.length; i++) {
            if (bcrypt.compareSync(email.toLowerCase(), subs[i].email)) {
                response.Message = ("The provided email has already been subscribed.");
                return response;
            }
        }

        const users = await UserModel.find({});

        for (let i = 0; i < users.length; i++) {
            if (bcrypt.compareSync(email.toLowerCase(), users[i].username)) {
                await UserModel.updateOne({ username: users[i].username }, { isSubscribed: true });
                break;
            }
        }

        await new SubModel({ email: bcrypt.hashSync(email.toLowerCase()) }).save();
        response.Message = `Your email at ${email} has been successfully added as a subscriber!`;

        return response;
    } catch (error) {
        return error;
    }
}

module.exports = { createSub };