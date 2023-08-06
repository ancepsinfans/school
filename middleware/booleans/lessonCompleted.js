import fetchUser from "../fetchers/fetchUser"

export default async function lessonCompleted(ID, sphere, course, current) {
    const completedLessons = await fetchUser({
        distinct: 'progress.lesson',
        ID: ID,
        sphere: sphere,
        course: course
    })


    return completedLessons.includes(current)
}