import axios from 'axios'

export default async function fetchDBStructure(params) {
    const BASE_URL = process.env.BASE_URL
    let dbData

    try {
        const response = await axios.get(`${BASE_URL}/api/lesson/spheres`, {params: params});
        dbData = response.data;

    } catch (error) {
        console.error('Error:');
        throw error;
    }

    return dbData

}

