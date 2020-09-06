const { UserModel } = require("../models/user.model");
const { Session } = require("../models/session.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const loginUser = async (user) => {

    let response = { Error: null, User: null, SessionId: null };

    try {
        const { username, password } = user;
        let foundUser = false;
        let allUsers = await UserModel.find({});
        let _user;
       
        for (var i = 0; i < allUsers.length; i++) {
            if (bcrypt.compareSync(username, allUsers[i].username)) {
                foundUser = true;
                _user = allUsers[i];
                break;
            }
        }

        if (foundUser) {
            if (!UserModel.validatePassword(password, _user.hash)) {
                response.Error = "Invalid password";
                return response;
            }
        } else {
            response.Error = "Provided username not found.";
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