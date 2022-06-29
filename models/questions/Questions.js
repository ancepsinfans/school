import mongoose from "mongoose";
var Schema = mongoose.Schema

var question = new Schema({
    desc: String,
    options: [String],
    correct: String,
    sphere: String,
    course: String,
    lesson: String,
    id: String,
    good: {
        type: String,
        default: 'Great!'
    },
    bad: {
        type: String,
        default: 'Not this'
    }
}, {
    collection: 'questions'
})

mongoose.models = {}

var Question = mongoose.model('Question', question)

export default Question