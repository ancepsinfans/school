import axios from 'axios'

export default async function getStructure() {

    let dbData

    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/lesson/spheres`);
        dbData = response.data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

    return dbData

}

