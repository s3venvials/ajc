const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

let UserSchema = new Schema({
    username: { type: String },
    hash: { type: String },
    salt: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verified: { type: Boolean, default: false },
    sessionId: String
});

UserSchema.methods.setPassword = function (password) {
    this.salt = bcrypt.genSaltSync();
    this.hash = bcrypt.hashSync(password, this.salt);
};

UserSchema.statics.validatePassword = function (password, _hash) {
    const hash = bcrypt.compareSync(password, _hash);
    return hash;
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel };