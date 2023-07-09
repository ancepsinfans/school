function getSphereName(db, e, obj = false) {
    if (obj) {
        return db
            .find(({ sphere }) => sphere === e.sphere)
    }
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.name
}

function getCourseName(db, e, obj = false) {
    if (obj) {
        return db
            .find(({ sphere }) => sphere === e.sphere)
            ?.courses
            .find(({ course }) => course === e.course)
    }
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.courses
        .find(({ course }) => course === e.course)
        ?.name
}

function getLessonName(db, e, obj = false) {
    if (obj) {
        return db
            .find(({ sphere }) => sphere === e.sphere)
            ?.courses
            .find(({ course }) => course === e.course)
            ?.lessons
            .find(({ lesson }) => lesson === e.lesson)
    }
    return db
        .find(({ sphere }) => sphere === e.sphere)
        ?.courses
        .find(({ course }) => course === e.course)
        ?.lessons
        .find(({ lesson }) => lesson === e.lesson)
        ?.name

}

function getAnyName(db, e, level) {

    let val
    switch (level) {
        case 1:
            val = getSphereName(db, e, true)
            break
        case 2:
            val = getCourseName(db, e, true)
            break
        case 3:
            val = getLessonName(db, e, true)
            break
        default:
            val = ''
    }
    return val

}


export { getLessonName, getCourseName, getSphereName, getAnyName }