const { UserModel } = require("../models/user.model");

/**
 * Helper function to return a user based on their session id
 * @param {String} sessionId
 * @returns {Promise.<Response: { Error: String, default is null, User: found user object, default is null } >}
 * On error returns a catched error.
 */
const getUser = async (sessionId) => {

    let response = { Error: null, User: null };

    try {

      if (!sessionId) {
        response.Error = "No session ID was provided.";
        return response;
      }
      
      const user = await UserModel.find({ sessionId });

      user.length === 0 ? response.Error = "No user found" : response.User = user;
      return response;

    } catch (error) {
      return error;
    }
}

module.exports = { getUser };