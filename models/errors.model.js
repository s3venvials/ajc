const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DEFAULT_TIME_ZONE = "America/Phoenix"
let moment = require("moment-timezone");

const ErrorSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    dateSubmitted: {
        type: String,
        default: moment().tz(DEFAULT_TIME_ZONE).toString()
    },
    createdAt: {
        type: Date,
        default: moment().tz(DEFAULT_TIME_ZONE).toDate(),
    },
    expireAt: {
        type: Date,
        default: moment().add(31536000000, "ms").tz(DEFAULT_TIME_ZONE).toDate(),
        index: { 
            expires: '30s'
        }
    }
});

ErrorSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('errorlogs', ErrorSchema);