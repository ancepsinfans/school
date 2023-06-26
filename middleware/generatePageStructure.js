import axios from 'axios';

export default async function generatePageStructure() {
    const BASE_URL = process.env.NODE_ENV === "development" ? process.env.DEV : process.env.PROD
    try {
        const response = await axios.get(`${BASE_URL}/api/lesson/fetchPageStructure`);
        const pageStructure = response.data;
        return pageStructure
    } catch (error) {
        console.error('Error fetching page structure:');
    }
}
