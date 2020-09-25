const { UserModel } = require("../models/user.model");

/**
 * Helper function to verify a user's email.
 * @param {String} id ObjectId of a user. 
 */
const verifyEmail = async (id) => {
    try {   
        let res = await UserModel.updateOne({ _id: id }, { verified: true });
        return res;

    } catch (error) {
        return error;
    }
}

module.exports = { verifyEmail };