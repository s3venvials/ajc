let bcrypt = require("bcryptjs");
let userModel = require("../models/user.model").User;

/**
 * 
 * @param {Object} userParam - req.body from user registration 
 * @returns {Object} response object - { Message, User, Error }
 */
let createUser = async (userParam) => {
    let response = { Message: null, User: null, Error: null };

    try {
        let users = await userModel.find({});

        for (var i = 0; i < users.length; i++) {
            if (bcrypt.compareSync(userParam.username, users[i].username)) {
                response.Error = ("The provided username has already been registered.");
                return Promise.resolve(response);
            }
        }

        let newUser = new userModel(userParam);

        //Save user
        newUser.username = bcrypt.hashSync(userParam.username);
        await newUser.setPassword(userParam.password);
        newUser.userinitials = utils.createInitials(`${userParam.firstName} ${userParam.lastName}`).Item;
        await newUser.save();

        response.User = newUser;
        response.Message = "Sign up successful!";

        return Promise.resolve(response);

    } catch (error) {
        response.Error = error;
        return Promise.resolve(response);
    }
}

module.exports = { createUser };