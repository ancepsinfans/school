import axios from 'axios';

export default async function generatePageStructure() {

    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/lesson/fetchPageStructure`);
        const pageStructure = response.data;
        return pageStructure
    } catch (error) {
        console.error('Error fetching page structure:');
    }
}
