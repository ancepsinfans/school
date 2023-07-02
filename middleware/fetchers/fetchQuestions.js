import axios from 'axios'


export default async function fetchQuestions(options=null) {
    let params ={}
    if (!!options) {
        params = {...options}

    }
    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/lesson/questions`, {params: params});
        const qs = response.data.data;
        return qs
    } catch (error) {
        console.error('Error fetching lesson page:');
    }


}

