import axios from 'axios'


export default async function fetchQuestions() {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/lesson/questions`);
        const qs = response.data.data;
        return qs
    } catch (error) {
        console.error('Error fetching lesson page:');
    }


}

