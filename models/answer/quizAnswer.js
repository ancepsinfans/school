import mongoose from "mongoose";
var Schema = mongoose.Schema

var quizAnswer = new Schema({
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
    id: {
        type: String,
        required: true
    },
    sphere: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'answers'
})

mongoose.models = {}

var QuizAnswer = mongoose.model('QuizAnswer', quizAnswer)

export default QuizAnswer