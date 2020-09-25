const { verify } = require("crypto");
const { newReadsNotification } = require("./new_reads.template");
const { verifyEmailNotification } = require("./verify_email.template");

module.exports = {
    newReadsNotification,
    verifyEmailNotification
}