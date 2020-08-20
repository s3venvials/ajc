const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reads = new Schema({
    title: String,
    category: [],
    content: String,
    createdDate: { type: Date, default: new Date() },
    imgPath: String,
    imageUrl: String
});

module.exports = mongoose.model('reads', Reads);