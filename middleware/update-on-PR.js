
const fs = require('fs');
const path = require('path')
const mongoose = require('mongoose');
const { promisify } = require('util');

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
// mongoose.set('debug', true)
const connectionString = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: 'admin',
    ssl: true,
    dbName: 'school'
});

const SphereModel = mongoose.model('Sphere', sphereSchema);


function getFolderStructure(folderPath) {
    const folderContents = fs.readdirSync(folderPath);
    const folderObject = {};

    const files = [];

    folderContents.forEach((item) => {
        const itemPath = path.join(folderPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();
        if (item === '.obsidian') {
            return
        }

        if (isDirectory) {
            folderObject[item] = getFolderStructure(itemPath);
        } else {
            const fileName = item.replace(/\.[^.]+$/, ''); // Remove file extension
            files.push(fileName);
        }
    });

    if (files.length > 0) {
        folderObject._files = files;
    }

    return folderObject;
}
// Path to the folder in your workspace
const folderPath = '_pages';
const folderStructure = getFolderStructure(folderPath);
// Select the database to use.

function transformFileName(fileName, level) {
    let number, rest
    if (level > 2) {
        [number, ...rest] = fileName.split('-');
    } else {
        rest = fileName.split('-');

    }

    const lesson = rest.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return { lesson, slug: fileName, number };
}
// Async function to perform the queries and retrieve the matching document
async function checkAndProcessDocuments() {
    for (const sphere of Object.keys(folderStructure)) {
        const { lesson: transformedSphere } = transformFileName(sphere, 1);

        for (const course of Object.keys(folderStructure[sphere])) {
            const { lesson: transformedCourse } = transformFileName(course, 2);
            const lessons = folderStructure[sphere][course]._files;

            for (const lesson of lessons) {
                const { lesson: transformedLesson, slug, number } = transformFileName(lesson, 3);

                const existingSphere = await SphereModel.find({
                    slug: sphere,
                });

                const text = await promisify(fs.readFile)(path.join(folderPath, sphere, course, lesson + '.mdx'), 'utf8');


                if (!!existingSphere.length) {
                    const existingCourseIndex = existingSphere[0].courses.findIndex((c) => c.slug === course);

                    if (existingCourseIndex > -1) {
                        const existingCourse = existingSphere[0].courses[existingCourseIndex];
                        const existingLesson = existingCourse.lessons.find((lesson) => lesson.slug === slug);

                        if (existingLesson) {
                            // Lesson exists, check if text needs to be updated
                            if (existingLesson.text !== text) {
                                existingLesson.text = text;
                            } else {
                                console.log('Text is already up to date, no update needed.');
                            }
                        } else {
                            // Lesson doesn't exist, create a new lesson and add it to the course
                            const newLesson = {
                                lesson: transformedLesson,
                                slug,
                                description: '',
                                text,
                                number,
                            };
                            existingCourse.lessons.push(newLesson);
                        }

                        // Update the existing sphere document
                        existingSphere[0].courses[existingCourseIndex] = existingCourse;
                        await SphereModel.updateOne(
                            {
                                slug: sphere,
                            },
                            {
                                $set: {
                                    courses: existingSphere[0].courses,
                                },
                            }
                        );
                    } else {
                        // Course doesn't exist, create a new course with the lesson
                        const newCourse = {
                            course: transformedCourse,
                            slug: course,
                            description: '',
                            linear: true,
                            lessons: [
                                {
                                    lesson: transformedLesson,
                                    slug,
                                    description: '',
                                    text,
                                    number,
                                },
                            ],
                        };

                        existingSphere[0].courses.push(newCourse);

                        // Update the existing sphere document
                        await SphereModel.updateOne(
                            {
                                slug: sphere,
                            },
                            {
                                $set: {
                                    courses: existingSphere[0].courses,
                                },
                            }
                        );
                    }
                } else {
                    // Sphere doesn't exist, create a new sphere with the course and lesson
                    const newCourse = {
                        course: transformedCourse,
                        slug: course,
                        description: '',
                        linear: true,
                        lessons: [
                            {
                                lesson: transformedLesson,
                                slug,
                                description: '',
                                text,
                                number,
                            },
                        ],
                    };

                    const newSphere = {
                        sphere: transformedSphere,
                        slug: sphere,
                        show: false,
                        disable: false,
                        description: '',
                        courses: [newCourse],
                    };

                    // Create a new sphere document
                    await SphereModel.create(newSphere);
                }
            }
        }
    }
    mongoose.disconnect()
}
checkAndProcessDocuments()
    .then(() => {
        console.log('Documents checked and processed successfully');
    })
    .catch((error) => {
        console.error('Error occurred:', error);
    });