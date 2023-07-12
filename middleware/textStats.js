
const mongoose = require('mongoose');

// Define your schemas
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
const connectionString = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: 'admin',
    ssl: true,
    dbName: 'school'
});

const SphereModel = mongoose.model('Sphere', sphereSchema);

function calculateReadability(text) {
    // Calculate the number of words
    const words = text.trim().split(/\s+/).length;

    // Calculate the number of sentences
    const sentences = text.trim().split(/[.!?]+/).length;

    // Calculate the number of syllables
    const syllables = text.trim().split(/[aeiouy]+/).length - 1;

    // Calculate the Flesch Reading Ease score
    const fleschReadingEase = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);

    // Calculate the reading time in minutes
    const readingTime = Math.ceil(words / 200); // Assuming an average reading speed of 200 words per minute


    let cefrLevel = '';
    if (fleschReadingEase < 30) {
        cefrLevel = 'A1';
    } else if (fleschReadingEase < 50) {
        cefrLevel = 'A2';
    } else if (fleschReadingEase < 60) {
        cefrLevel = 'B1';
    } else if (fleschReadingEase < 70) {
        cefrLevel = 'B2';
    } else if (fleschReadingEase < 80) {
        cefrLevel = 'C1';
    } else {
        cefrLevel = 'C2';
    }


    return {
        fleschReadingEase: fleschReadingEase.toFixed(2), // Round the score to two decimal places
        words: words,
        readingTime: readingTime,
        cefrLevel: cefrLevel
    };
}

async function getTexts() {
    const spheres = await SphereModel.find({});
    for (const sphere of spheres) {
        for (const course of sphere.courses) {
            for (const lesson of course.lessons) {
                const { _id, text } = lesson;
                const results = calculateReadability(text);

                // Compare the calculated values with the existing values in the database
                if (results.fleschReadingEase !== lesson.fleschReadingEase ||
                    results.words !== lesson.words ||
                    results.readingTime !== lesson.readingTime ||
                    results.cefrLevel !== lesson.cefrLevel) {
                    // Values are different, create a new object with the updated values
                    const updatedLesson = {
                        ...lesson.toObject(), // Convert the Mongoose document to a plain JavaScript object
                        fleschReadingEase: results.fleschReadingEase,
                        words: results.words,
                        readingTime: results.readingTime,
                        cefrLevel: results.cefrLevel
                    };
                    // Update the lesson document by replacing it within the array
                    const lessonIndex = course.lessons.findIndex(l => l._id.equals(_id));
                    course.lessons.splice(lessonIndex, 1, updatedLesson);

                    // Update the sphere document by replacing it within the array
                    const courseIndex = sphere.courses.findIndex(c => c.course === course.course);
                    sphere.courses.splice(courseIndex, 1, course);

                    // Update the existing sphere document
                    await SphereModel.updateOne(
                        { 'slug': sphere.slug },
                        { $set: { 'courses': sphere.courses } }
                    );
                    console.log(`Lesson ${_id} updated.`);
                } else {
                    console.log(`Lesson ${_id} is up to date.`);
                }
            }
        }
    }
    mongoose.disconnect();
}

getTexts();
