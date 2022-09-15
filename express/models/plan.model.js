const mongoose = require('mongoose');
const base = require('./base.schema');

const planSchema = new base.Schema({
    plan: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    expire: {
        type: Number,
        required: true
    },
    remark: {
        type: String
    }
});

module.exports = new mongoose.model('Plan', planSchema);
