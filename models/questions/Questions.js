import mongoose from "mongoose";



const question = new mongoose.Schema({
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


export default mongoose.models.Question || mongoose.model('Question', question)