const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { Schema } = mongoose;

let SessionSchema = new Schema({
    sessionId: { type: String, required: true },
    userId: { type: ObjectID },
    createdAt: { type: Date, default: new Date() }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = { Session };