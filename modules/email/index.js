let { verifyEmailTemplate } = require("./templates/verify_email.template");
let { sendEmail } = require("../../utils");
let keys = require("../../config/keys");

let sendEmailConfirmation = async (sender, recipient) => {
    try {
        let response = await sendEmail(keys.nodeMailer.transport, verifyEmailTemplate(sender, recipient));
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { sendEmailConfirmation };