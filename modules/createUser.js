const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/user.model");
const { createSub } = require("./createSub");
const { SubModel } = require("../models/subs.model");

/**
 * 
 * @param {Object} userParam - req.body from user registration 
 * @returns {Object} response object - { Message, User, Error }
 */
const createUser = async (userParam) => {

    let response = { Message: null, User: null, Error: null };
    let { firstName, lastName, email, confirmEmail, password, confirmPassword, isSubscribed } = userParam;

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
        let users = await UserModel.find({});

        for (let i = 0; i < users.length; i++) {
            if (bcrypt.compareSync(email.toLowerCase(), users[i].username)) {
                response.Error = ("The provided email has already been registered.");
                return response;
            }
        }

        //If user subscribes before creating an account.
        let subs = await SubModel.find({});
        for (let i = 0; i < subs.length; i++) {
            if (bcrypt.compareSync(email.toLowerCase(), subs[i].email)) {
                userParam.isSubscribed = true;
            }
        }


        let newUser = new UserModel(userParam);

        //Save user
        newUser.username = bcrypt.hashSync(email.toLowerCase());
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