import mongoose from "mongoose";
var Schema = mongoose.Schema


var studentAnswers = new Schema({
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

})

var studentProgress = new Schema({
    sphere: String,
    course: String,
    page: String,
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
    }]
}, {
    collection: 'students'
})

mongoose.models = {}

var StudentSchema = mongoose.model('StudentSchema', studentSchema)
var StudentProgress = mongoose.model('StudentProgress', studentProgress)
var StudentAnswers = mongoose.model('StudentAnswers', studentAnswers)


export { StudentSchema, StudentProgress, StudentAnswers }