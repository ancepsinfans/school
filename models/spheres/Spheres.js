import mongoose from "mongoose";
var Schema = mongoose.Schema


const lessonSchema = new mongoose.Schema({
    lesson: String,
    name: String,
    description: String,
});

const courseSchema = new mongoose.Schema({
    course: String,
    name: String,
    description: String,
    lessons: [lessonSchema],
});

const sphereSchema = new mongoose.Schema({
    sphere: String,
    name: String,
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