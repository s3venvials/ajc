const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reads = new Schema({
    title: String,
    content: String,
    comments: []
});

module.exports = mongoose.model('reads', Reads);