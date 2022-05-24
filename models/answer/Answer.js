import mongoose from "mongoose";
var Schema = mongoose.Schema

var answer = new Schema({
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
    type: {
        type: String,
        required: true
    },
    attempt: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'answers-test'
})

mongoose.models = {}

var Answer = mongoose.model('Answer', answer)

export default Answer