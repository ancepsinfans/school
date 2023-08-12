import fetchUser from "../fetchers/fetchUser";

export default async function lessonDisabled(ID, sphere, course, requirements) {
    const completedLessons = await fetchUser({ distinct: 'progress.lesson', ID, sphere, course })


    return requirements?.length !== 0 && requirements?.every((lesson) => !completedLessons.includes(lesson))
}