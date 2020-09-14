const { UserModel } = require("../models/user.model");

const verifyEmail = async (id) => {
    try {   
        let res = await UserModel.updateOne({ _id: id }, { verified: true });
        return res;

    } catch (error) {
        return error;
    }
}

module.exports = { verifyEmail };