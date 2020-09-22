const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const salarySchema = new Schema({
    month: {
        type: Date,
        required: true
    },
    year: {
        type: Date
    },
    amount: {
        type: Number
    },
    penalty: {
        type: Number
    },
    tax: {
        type: Number
    },
    deductions: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    salaryStatus: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Salary', salarySchema);