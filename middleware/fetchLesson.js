import axios from 'axios';

export default async function fetchLessonPage(sphere, course, lesson) {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/lesson/fetchLesson`, { params: { sphere: sphere, course: course, lesson: lesson } });
        const fileContents = response.data.content;
        return fileContents
    } catch (error) {
        console.error('Error fetching lesson page:');
    }
}
