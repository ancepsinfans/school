import axios from 'axios'


export default async function getStructure(both = false) {

    let baseURL = process.env.PROD
    if (process.env.NODE_ENV === 'development') {
        baseURL = process.env.DEV
    }

    let dbData
    let fileData

    try {
        const response = await axios.get(`${baseURL}/api/spheres`);
        dbData = response.data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

    if (both) {
        const r = await axios.get(`${baseURL}/api/allLessons`)
        fileData = r.data.data
        return { dbData, fileData }
    } else {
        return dbData
    }

}

