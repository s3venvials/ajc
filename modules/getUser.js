const { UserModel } = require("../models/user.model");

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