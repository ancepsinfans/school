import axios from 'axios';

export default async function fetchUser(ID, options) {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/user/user`, { params: { ID: ID, options: JSON.stringify(options) } });
        return response.data;

    } catch (error) {
        console.error('Error fetching lesson page:');
    }
}
