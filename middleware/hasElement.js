const hasElement = (db, data) => {
    let sphereName = data.sphere
    let courseName = data.course
    let lessonName = data.lesson

    const sphere = db.find((item) => item.sphere == sphereName);

    if (!!courseName) {
        if (!!sphere) {
            const course = sphere.courses.find((item) => item.course === courseName);
            if (!!lessonName) {
                if (!!course) {

                    const lesson = course.lessons.find((item) => item.lesson === lessonName);

                    if (!!lesson) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                return !!course
            }
        } else {
            return false
        }
    } else {

        return !!sphere
    }

};

export default hasElement