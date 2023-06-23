import axios from 'axios'


export default async function getStructure() {

    let baseURL = process.env.PROD
    if (process.env.NODE_ENV === 'development') {
        baseURL = process.env.DEV
    }


    try {
        const response = await axios.get(`${baseURL}/api/spheres`);
        const data = response.data;

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

