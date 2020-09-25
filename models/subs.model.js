const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectID } = require('mongodb');

const subSchema = new Schema({
    userId: { type: ObjectID },
    email: String
});

const SubModel = mongoose.model("Sub", subSchema);

module.exports = { SubModel };