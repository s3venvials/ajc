const { UserModel } = require("../models/user.model");
const { Session } = require("../models/session.model");
const crypto = require("crypto");

/**
 * Helper function to check if a user exist and logs them in with a created session ID.
 * @param {import("../models/user.model")} user Instance of the user model
 * @returns {Promise.<Response: { Error: String, default is null, User: Instance of user object, default is null, SessionId: String, default is null }>}
 */
const loginUser = async (user) => {

    let response = { Error: null, User: null, SessionId: null };

    try {
        const { username, password } = user;
        let foundUser = false;
        let allUsers = await UserModel.find({});
        let _user;
       
        for (var i = 0; i < allUsers.length; i++) {
            if (username.toLowerCase() === allUsers[i].username.toLowerCase()) {
                foundUser = true;
                _user = allUsers[i];
                break;
            }
        }

        if (foundUser) {
            if (!UserModel.validatePassword(password, _user.hash)) {
                response.Error = "401 Unauthorized";
                return response;
            }
        } else {
            response.Error = "401 Unauthorized";
            return response;
        }

        if (!_user.verified) {
            response.Error = false;
            return response;
        }

        let sessionId = _user.sessionId;

        if (!sessionId) {
            sessionId = crypto.randomBytes(64).toString('hex');
            await UserModel.updateOne({ _id: _user._id }, { sessionId });
            let newSession = new Session();
            newSession.sessionId = sessionId;
            newSession.userId = _user._id;
            await newSession.save();
        }

        response.User = _user;
        response.SessionId = sessionId;

        return response;
        
    } catch (error) {
        return error;
    }
}

module.exports = { loginUser };