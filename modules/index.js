const { createUser } = require("./createUser");
const { loginUser } = require("./loginUser");
const { getUser } = require("./getUser");
const { logoutUser } = require("./logoutUser");
const { sendEmailConfirmation } = require("./email/index");

module.exports = {
    createUser,
    loginUser,
    getUser,
    logoutUser,
    sendEmailConfirmation
}