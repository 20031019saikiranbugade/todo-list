const mongoose = require('mongoose');

const url = process.env.DB_URL;
mongoose.connect(`mongodb://127.0.0.1:27017/${url}`)
    .then(() => console.log("Connection Successfully ..."))
    .catch((error) => console.log(error));

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
});

const userDetails1 = mongoose.model('userDetails', Schema);

const userDetailsSchema = new mongoose.Schema({
    workTasks:[{
        type:String,
    }],
    // workTasks: [{
    //     work: String,
    //     status: Boolean,
    // }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDetails',
    },

});
const userTaskDetails = mongoose.model('userTaskDetails', userDetailsSchema);

module.exports = {
    userDetails1,
    userTaskDetails,
}
