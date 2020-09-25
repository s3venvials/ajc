const { UserModel } = require("../models/user.model");
const { Session } = require("../models/session.model");

/**
 * Helper function to log a user out. Deletes user's session ID.
 * @param {String} sessionId 
 * @returns {Promise.<Response: { Message: String, default is null, Error: String, defualt is null } >}
 */
const logoutUser = async (sessionId) => {

    let response = { Message: null, Error: null };

    try {
        if (!sessionId) {
            response.Error = "No session ID was provided.";
            return response;
        }

        await UserModel.updateOne({ sessionId }, { sessionId: "" });
        let removeSessionId = await Session.deleteOne({ sessionId });

        if (removeSessionId.ok === 1) { 
            response.Message = "Signed Out";
            Session.deleteOne({ sessionId });
        }

        return response;
    } catch (error) {
        return error;
    }
}

module.exports = { logoutUser };