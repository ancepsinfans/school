import axios from 'axios';

export default async function fetchFileTreeStructure() {

    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/lesson/fileTreeStructure`);
        const pageStructure = response.data;
        return pageStructure
    } catch (error) {
        console.error('Error fetching page structure:');
    }
}
