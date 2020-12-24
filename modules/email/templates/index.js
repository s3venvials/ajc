const { newReadsNotification } = require("./new_reads.template");
const { verifyEmailNotification } = require("./verify_email.template");
const { feedBackNotification } = require("./feed_back.template");

module.exports = {
    newReadsNotification,
    verifyEmailNotification,
    feedBackNotification
}