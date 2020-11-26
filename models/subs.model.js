const mongoose = require("mongoose");
const { Schema } = mongoose;

const subSchema = new Schema({
    passCode: String,
    email: String,
    isVerified: { type: Boolean, default: false }
});

const SubModel = mongoose.model("Sub", subSchema);

module.exports = { SubModel };