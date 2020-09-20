const { verifyEmailTemplate } = require("./templates/verify_email.template");
const { sendEmail } = require("../../utils");
const keys = require("../../config/keys");
const { logErrors } = require("../../modules");


let sendEmailConfirmation = async (sender, recipient, id) => {
    try {
        console.log(sender, recipient, id);
        console.log(process.env.NODE_MAILER)
        let response = await sendEmail(keys.nodeMailer.transport, verifyEmailTemplate(sender, recipient, id));
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        await logErrors(error);
        return error;
    }
}

module.exports = { sendEmailConfirmation };