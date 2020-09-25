const { SubModel } = require("../models/subs.model");
const { UserModel } = require("../models/user.model");

/**
 * Helper function to add a user's email to the subscribe collection.
 * @param {String} email
 * @returns { Promise.<Response: { Message: String, default is null } Message if the email is already subscribed or if it was added to the list.
 */
const createSub = async (email) => {

    let response = { Message: null };

    try {

        if (!email) return;

        const subs = await SubModel.find({});

        for (let i = 0; i < subs.length; i++) {
            if (email.toLowerCase() === subs[i].email.toLowerCase()) {
                response.Message = ("The provided email has already been subscribed.");
                return response;
            }
        }

        const users = await UserModel.find({});

        for (let i = 0; i < users.length; i++) {
            if (email.toLowerCase() === users[i].username.toLowerCase()) {
                await UserModel.updateOne({ username: users[i].username }, { isSubscribed: true });
                break;
            }
        }

        await new SubModel({ email }).save();
        response.Message = `Your email at ${email} has been successfully added as a subscriber!`;

        return response;
    } catch (error) {
        return error;
    }
}

module.exports = { createSub };