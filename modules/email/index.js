let { verifyEmailTemplate } = require("./templates/verify_email.template");
let { sendEmail } = require("../../utils");
let keys = require("../../config/keys");

let sendEmailConfirmation = async (sender, recipient) => {
    try {
        let response = await sendEmail(keys.nodeMailer.transport, verifyEmailTemplate(sender, recipient));
        return response;
    } catch (error) {
        return error;
    }
}

module.exports = { sendEmailConfirmation };