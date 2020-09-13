const mongoose = require("mongoose");
const { Schema } = mongoose;

const subSchema = new Schema({
    email: String
});

const SubModel = mongoose.model("Sub", subSchema);

module.exports = { SubModel };