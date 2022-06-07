import mongoose from "mongoose";
var Schema = mongoose.Schema

var studentProgress = new Schema({
    user: {
        type: String,
        required: true
    },
    sphere: {
        type: String,
        required: true
    },
    page: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'progress'
})

mongoose.models = {}

var StudentProgress = mongoose.model('StudentProgress', studentProgress)

export default StudentProgress