const { SubModel } = require("../models/subs.model");
const { verifyEmailNotification } = require("../modules/email/templates");
const { sendEmail } = require("../utils");
const keys = require("../config/keys");
const { generateId } = require("../utils");

/**
 * Helper function to add a user's email to the subscribe collection.
 * @param {String} email
 * @returns { Promise.<{Message: (String|null), Error: (String|null), isSubscribed: Boolean}> }
 */
const createSub = async (email) => {

    let response = { Message: null, Error: null, isSubscribed: false };

    try {

        if (!email) return;

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(email)) {
            response.Error = "Invalid email";
            return response;
        }

        const subs = await SubModel.find({});
        const passCode = generateId(6).toUpperCase();

        for (let i = 0; i < subs.length; i++) {
            if (email.toLowerCase() === subs[i].email.toLowerCase() && subs[i].isVerified) {
                response.Message = ("The provided email has already been subscribed.");
                response.isSubscribed = true;
                return response;
            }

            if (email.toLowerCase() === subs[i].email.toLowerCase() && !subs[i].isVerified){
                await SubModel.updateOne({ email }, { passCode });
                await sendEmail(verifyEmailNotification(keys.emailSender, email, passCode));
                response.Message = `Please verify your email account by providing the pass code we sent to ${email}.`;
                return response;
            }
        }

        const _subs = new SubModel();
        _subs.passCode = passCode;
        _subs.email = email;

        await _subs.save();
        await sendEmail(verifyEmailNotification(keys.emailSender, email, passCode));
        response.Message = `Please verify your email account by providing the pass code we sent to ${email}.`;

        return response;

    } catch (error) {
        return error;
    }
}

module.exports = { createSub };