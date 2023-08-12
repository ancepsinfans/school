const hasElement = (db, data) => {
    const { sphere: sphereName, course: courseName, lesson: lessonName } = data;

    const foundSphere = db.find((item) => item.sphere === sphereName);
    if (!foundSphere) return false;

    if (courseName) {
        const foundCourse = foundSphere.courses.find((item) => item.course === courseName);
        if (!foundCourse) return false;

        if (lessonName) {
            const foundLesson = foundCourse.lessons.find((item) => item.lesson === lessonName);
            return !!foundLesson;
        }

        return true;
    }

    return true;
};

export default hasElement;


// const hasElement = (db, data) => {
//     let sphereName = data.sphere
//     let courseName = data.course
//     let lessonName = data.lesson

//     const sphere = db.find((item) => item.sphere == sphereName);

//     if (!!courseName) {
//         if (!!sphere) {
//             const course = sphere.courses.find((item) => item.course === courseName);
//             if (!!lessonName) {
//                 if (!!course) {

//                     const lesson = course.lessons.find((item) => item.lesson === lessonName);

//                     if (!!lesson) {
//                         return true
//                     } else {
//                         return false
//                     }
//                 } else {
//                     return false
//                 }
//             } else {
//                 return !!course
//             }
//         } else {
//             return false
//         }
//     } else {

//         return !!sphere
//     }

// };

// export default hasElement