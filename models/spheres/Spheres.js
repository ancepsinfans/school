import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    lesson: String,
    slug: String,
    description: String,
    text: String,
    number: String,
    fleschReadingEase: String,
    words: Number,
    readingTime: Number,
    cefrLevel: String,
    requirements: [String]
});

const courseSchema = new mongoose.Schema({
    course: String,
    slug: String,
    description: String,
    linear: Boolean,
    lessons: [lessonSchema],
});

const sphereSchema = new mongoose.Schema({
    sphere: String,
    slug: String,
    show: Boolean,
    disable: Boolean,
    description: String,
    courses: [courseSchema],
}, {
    collection: 'spheres'
});



mongoose.models = {}

var SphereSchema = mongoose.model('SphereSchema', sphereSchema)
var CourseSchema = mongoose.model('CourseSchema', courseSchema)
var LessonSchema = mongoose.model('LessonSchema', lessonSchema)

export { SphereSchema, CourseSchema, LessonSchema }