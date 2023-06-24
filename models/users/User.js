import mongoose from "mongoose";
var Schema = mongoose.Schema


var studentAnswers = new Schema({
    answer: String,
    correct: String,
    type: String,
    attempt: Number,
    id: String,
    sphere: String,
    course: String,
    lesson: String,
    timestamp: {
        type: Date,
        default: Date.now
    }

})

var studentFeedback = new Schema({
    answer: [String],
    id: String,
    sphere: String,
    course: String,
    lesson: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
})

var studentVocab = new Schema({
    term: String,
    sphere: String,
    course: String,
    lesson: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
})

var studentProgress = new Schema({
    sphere: String,
    course: String,
    lesson: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
})

var studentSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    answers: [{
        type: studentAnswers,
        required: false
    }],
    progress: [{
        type: studentProgress,
        required: false
    }],
    feedback: [{
        type: studentFeedback,
        required: false
    }],
    vocab: [{
        type: studentVocab,
        required: false
    }]
}, {
    collection: 'students'
})

mongoose.models = {}

var StudentSchema = mongoose.model('StudentSchema', studentSchema)
var StudentProgress = mongoose.model('StudentProgress', studentProgress)
var StudentAnswers = mongoose.model('StudentAnswers', studentAnswers)
var StudentFeedback = mongoose.model('StudentFeedback', studentFeedback)
var StudentVocab = mongoose.model('StudentVocab', studentVocab)


export { StudentSchema, StudentProgress, StudentAnswers, StudentFeedback, StudentVocab }