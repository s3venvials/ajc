const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectID } = require('mongodb');

const subSchema = new Schema({
    userId: { type: ObjectID },
    email: String,
    isVerified: { type: Boolean, default: false }
});

const SubModel = mongoose.model("Sub", subSchema);

module.exports = { SubModel };