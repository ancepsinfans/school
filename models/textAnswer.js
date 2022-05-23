import mongoose from "mongoose";
var Schema = mongoose.Schema

var textAnswer = new Schema({
    user: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    correct: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

mongoose.models = {}

var TextAnswer = mongoose.model('TextAnswer', textAnswer)

export default TextAnswer