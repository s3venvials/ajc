let bcrypt = require("bcryptjs");
let userModel = require("../models/user.model").User;

/**
 * 
 * @param {Object} userParam - req.body from user registration 
 * @returns {Object} response object - { Message, User, Error }
 */
let createUser = async (userParam) => {
    let response = { Message: null, User: null, Error: null };
    let { firstName, lastName, email, confirmEmail, password, confirmPassword } = userParam;

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
        let users = await userModel.find({});

        for (let i = 0; i < users.length; i++) {
            if (bcrypt.compareSync(email.toLowerCase(), users[i].username)) {
                response.Error = ("The provided email has already been registered.");
                return response;
            }
        }

        let newUser = new userModel(userParam);

        //Save user
        newUser.username = bcrypt.hashSync(email.toLowerCase());
        await newUser.setPassword(password);
        await newUser.save();

        response.User = newUser;
        response.Message = "Sign up successful!";

        return response;

    } catch (error) {
        response.Error = error;
        return response;
    }
}

module.exports = { createUser };