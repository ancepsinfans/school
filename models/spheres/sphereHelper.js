import axios from 'axios'

async function sphereSender(
    data,
    name,
    description,
    createNew
) {
    const { sphere, course, lesson } = data


    const payload = {
        sphere,
        course,
        lesson,
        name,
        description,
        createNew
    }
    const response = await axios.post(`/api/spheres`, payload)

}

export default sphereSender