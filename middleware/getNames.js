function getSphereName(db, e, obj = false, prop = 'slug') {
    if (obj) {
        return db
            .find(({ slug }) => slug === e.sphere)
    }
    return db
        .find(({ slug }) => slug === e.sphere)[prop]
}

function getCourseName(db, e, obj = false, prop = 'slug') {

    if (obj) {
        return db
            .find(({ slug }) => slug === e.sphere)
            ?.courses
            .find(({ slug }) => slug === e.course)
    }

    return db
        .find(({ slug }) => slug === e.sphere)
        ?.courses
        .find(({ slug }) => slug === e.course)[prop]
}

function getLessonName(db, e, obj = false, prop = 'slug') {

    if (obj) {
        return db
            .find(({ slug }) => slug === e.sphere)
            ?.courses
            .find(({ slug }) => slug === e.course)
            ?.lessons
            .find(({ slug }) => slug === e.lesson)
    }

    return db
        .find(({ slug }) => slug === e.sphere)
        ?.courses
        .find(({ slug }) => slug === e.course)
        ?.lessons
        .find(({ slug }) => slug === e.lesson)[prop]

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