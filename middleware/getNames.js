function getSphereName(db, e, obj = false) {
    if (obj) {
        return db
            .find(({ sphere }) => sphere === e)
    }
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.name
}

function getCourseName(db, e) {
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.courses
        .find(({ course }) => course === e.course)
        ?.name
}

function getLessonName(db, e) {
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.courses
        .find(({ course }) => course === e.course)
        ?.lessons
        .find(({ lesson }) => lesson === e.lesson)
        ?.name

}

export { getLessonName, getCourseName, getSphereName }