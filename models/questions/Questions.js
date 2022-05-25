import mongoose from "mongoose";
var Schema = mongoose.Schema

var question = new Schema({
    desc: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correct: {
        type: String,
        required: true
    },
    sphere: {
        type: String,
        required: true
    },
    feedback: {
        good: {
            type: String,
            default: 'Great!'
        },
        bad: {
            type: String,
            default: 'Not this'
        }
    }
}, {
    collection: 'questions'
})

mongoose.models = {}

var Question = mongoose.model('Question', question)

export default Question