const { SubModel } = require("../models/subs.model");
const { UserModel } = require("../models/user.model");
const { verifyEmailNotification } = require("../modules/email/templates");
const { sendEmail } = require("../utils");
const keys = require("../config/keys");
const { generateId } = require("../utils");

/**
 * Helper function to add a user's email to the subscribe collection.
 * @param {String} email
 * @returns { Promise.<Boolean> } true if email was subscribed, otherwise false.
 */
const createSub = async (email) => {

    let response = { Message: null, Error: null };

    try {

        if (!email) return;

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(email)) {
            response.Error = "Invalid email";
            return response;
        }

        const subs = await SubModel.find({});

        for (let i = 0; i < subs.length; i++) {
            if (email.toLowerCase() === subs[i].email.toLowerCase()) {
                response.Message = ("The provided email has already been subscribed.");
                return response;
            }
        }

        const users = await UserModel.find({});
        let verified = false;
        let userExists = false;

        //Check if email exist as a registered user and they have been verified.
        for (let i = 0; i < users.length; i++) {
            if (email.toLowerCase() === users[i].username.toLowerCase()) {
                userExists = true;
                if (users[i].isVerified) {
                    await UserModel.updateOne({ username: users[i].username }, { isSubscribed: true });
                    await SubModel.updateOne({ username: users[i].username }, { isVerified: true });
                    await new SubModel({ email }).save();
                    verified = true;
                    break;
                }
            }
        }

        response.Message = `Your email at ${email} has been successfully added as a subscriber!`;

        //Email is registered to a user but not verified.
        if (userExists && !verified) {
            const passCode = generateId(6).toUpperCase();
            await sendEmail(verifyEmailNotification(keys.emailSender, email, passCode));
            response.Message = `Please verify your email account by providing the pass code we sent to ${email}.`;
        } 

        //Email not registered and not verified.
        if (!userExists && !verified) {
            const passCode = generateId(6).toUpperCase();
            await sendEmail(verifyEmailNotification(keys.emailSender, email, passCode));
            response.Message = `Please verify your email account by providing the pass code we sent to ${email}.`;
        }

        return response;

    } catch (error) {
        return error;
    }
}

module.exports = { createSub };