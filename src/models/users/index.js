const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    staffId: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: "staff"
    },
    salary: [{
        type: Schema.Types.ObjectId,
        ref: "Salary"
    }],
    
    position: {
        type: String
    },
    department: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);