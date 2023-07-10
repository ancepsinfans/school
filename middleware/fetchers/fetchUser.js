import axios from 'axios';


export default async function fetchUser(options) {

    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/user/user`, { params: options });
        return response.data;

    } catch (error) {
        console.error('Error');
    }
}
