import axios from 'axios'

async function sphereSender(
    data,
    createNew
) {
    const payload = {
        sphere: data.sphere,
        course: data.course,
        lesson: data.lesson,
        name: data.name,
        description: data.desc,
        createNew
    }
    const response = await axios.post(`/api/lesson/spheres`, payload)

}

export default sphereSender