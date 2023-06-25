import axios from 'axios'

export default async function getStructure() {

    let baseURL = process.env.PROD
    if (process.env.NODE_ENV === 'development') {
        baseURL = process.env.DEV
    }

    let dbData

    try {
        const response = await axios.get(`${baseURL}/api/lesson/spheres`);
        dbData = response.data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

    return dbData

}

