const { UserModel } = require("../models/user.model");
const { createSub } = require("./createSub");
const { SubModel } = require("../models/subs.model");

/**
 * Helper function to create a user.
 * @param {Object} userParam - req.body from user registration 
 * @returns {Promise.<Response: { Message: String, default is null, Error: String, default is null, User: Created User, default is null }>}
 */
const createUser = async (userParam) => {

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

        //If user subscribes before creating an account.
        const subs = await SubModel.find({});
        for (let i = 0; i < subs.length; i++) {
            if (email.toLowerCase() === subs[i].email.toLowerCase()) {
                userParam.isSubscribed = true;
            }
        }


        const newUser = new UserModel(userParam);

        //Save user
        newUser.username = email;
        await newUser.setPassword(password);
        await newUser.save();

        response.User = newUser;
        response.Message = "Sign up successful! Please check your email to verify your account.";

        if (isSubscribed) await createSub(email);

        return response;

    } catch (error) {
        response.Error = error;
        return response;
    }
}

module.exports = { createUser };