import axios from 'axios'


export default async function fetchQuestions() {
    const BASE_URL = process.env.NODE_ENV === "development" ? process.env.DEV : process.env.PROD
    try {
        const response = await axios.get(`${BASE_URL}/api/lesson/questions`);
        const qs = response.data.data;
        return qs
    } catch (error) {
        console.error('Error fetching lesson page:');
    }


}

