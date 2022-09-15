const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    displayname: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: '0' // 0 is admin, 1 is superadmin
    }
});

adminSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    next();
});

adminSchema.statics.compare = function (cleattext, encrypted) {
    return bcrypt.compareSync(cleattext, encrypted);
};

module.exports = new mongoose.model('Admin', adminSchema);
