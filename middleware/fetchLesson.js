import axios from 'axios';

export default async function fetchLessonPage(sphere, course, lesson) {
    const BASE_URL = process.env.NODE_ENV === "development" ? process.env.DEV : process.env.PROD
    try {
        const response = await axios.get(`${BASE_URL}/api/lesson/fetchLesson`, { params: { sphere: sphere, course: course, lesson: lesson } });
        const fileContents = response.data.content;
        return fileContents
    } catch (error) {
        console.error('Error fetching lesson page:');
    }
}
