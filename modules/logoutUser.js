const { UserModel } = require("../models/user.model");
const { Session } = require("../models/session.model");

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