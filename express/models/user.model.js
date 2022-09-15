const mongoose = require('mongoose');
const base = require('./base.schema');
const bcrypt = require('bcryptjs');

const userSchema = new base.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: '1' // 1 is vertified, 0 is expired,
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    invitationCount: {
        type: Number,
        default: 200
    }
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    next();
});

userSchema.statics.compare = function (cleattext, encrypted) {
    return bcrypt.compareSync(cleattext, encrypted);
};

module.exports = new mongoose.model('User', userSchema);
