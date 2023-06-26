function sphereNamer(db, e) {
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.name
}

function courseNamer(db, e) {
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.courses
        .find(({ course }) => course === e.course)
        ?.name
}

function lessonNamer(db, e) {
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.courses
        .find(({ course }) => course === e.course)
        ?.lessons
        .find(({ lesson }) => lesson === e.lesson)
        ?.name

}

export { lessonNamer, courseNamer, sphereNamer }