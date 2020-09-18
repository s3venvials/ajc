const ErrorModel = require("../models/errors.model");
const { generateId } = require("../utils");

const logErrors = async (error) => {
    try {
        let newError = await new ErrorModel({ message: error.toString(), stack: error.stack, id: generateId() }).save();
        return Promise.resolve(newError);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = { logErrors };