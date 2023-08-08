function getSphereName(db, e, obj = false, prop = 'slug') {
    if (obj) {
        return db
            .find(({ slug }) => slug === e.sphere)
    }
    try {
        return db
            .find(({ slug }) => slug === e.sphere)[prop]
    } catch { return null }
}

function getCourseName(db, e, obj = false, prop = 'slug') {

    if (obj) {
        return db
            .find(({ slug }) => slug === e.sphere)
            ?.courses
            .find(({ slug }) => slug === e.course)
    }

    try {
        return db
            .find(({ slug }) => slug === e.sphere)
            ?.courses
            .find(({ slug }) => slug === e.course)[prop]
    } catch {
        return null
    }
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

    try {
        return db
            .find(({ slug }) => slug === e.sphere)
            ?.courses
            .find(({ slug }) => slug === e.course)
            ?.lessons
            .find(({ slug }) => slug === e.lesson)[prop]
    } catch {
        return null
    }

}

function getAnyName(db, e, level, obj = true, prop = 'slug') {

    let val
    switch (level) {
        case 1:
            val = getSphereName(db, e, obj, prop)
            break
        case 2:
            val = getCourseName(db, e, obj, prop)
            break
        case 3:
            val = getLessonName(db, e, obj, prop)
            break
        default:
            val = ''
    }
    return val

}


export { getLessonName, getCourseName, getSphereName, getAnyName }