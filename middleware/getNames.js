function getSphereName(db, e, obj = false) {
    if (obj) {
        return db
            .find(({ sphere }) => sphere === e)
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
    switch(level) {
        case 1:
            return getSphereName(db, e, true)
            break
        case 2:
            return getCourseName(db, e, true)
            break
        case 3:
            return getLessonName(db, e, true)
            break
        default:
            return ''
    }
        
}


export { getLessonName, getCourseName, getSphereName, getAnyName}