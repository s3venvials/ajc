const { UserModel } = require("../models/user.model");

/**
 * Helper function to create a user.
 * @param {Object} userParam - req.body from user registration 
 * @returns {Promise.<Response: { Message: String, default is null, Error: String, default is null, User: Created User, default is null }>}
 */
const createUser = async (userParam, passCode) => {

    let response = { Message: null, User: null, Error: null };
    const { firstName, lastName, email, confirmEmail, password, confirmPassword, isSubscribed } = userParam;

    if (!firstName || !lastName || !email || !confirmEmail || !password || !confirmPassword) {
        response.Error = "All fields are required!";
        return response;
    }

    if (email !== confirmEmail) {
        response.Error = "Emails do not match!";
        return response;
    }

    if (password !== confirmPassword) {
        response.Error = "Passwords do not match!";
        return response;
    }

    try {
        const users = await UserModel.find({});

        for (let i = 0; i < users.length; i++) {
            if (email.toLowerCase() === users[i].username.toLowerCase()) {
                response.Error = ("The provided email has already been registered.");
                return response;
            }
        }

        const newUser = new UserModel(userParam);

        //Save user
        newUser.username = email;
        await newUser.setPassword(password);
        newUser.passCode = passCode;
        await newUser.save();

        response.User = newUser;
        response.Message = "Sign up successful! Please provide the pass code we sent to your email to verify your account.";

        return response;

    } catch (error) {
        response.Error = error;
        return response;
    }
}

module.exports = { createUser };