import mongoose from "mongoose";
var Schema = mongoose.Schema

var sphereSchema = new Schema({
    sphere: {
        type: String,
        required: true
    },
    courses: {
        course: String,
        pages: [String]
    },
}, {
    collection: 'spheres'
})

mongoose.models = {}

var SphereSchema = mongoose.model('SphereSchema', sphereSchema)


export default SphereSchema