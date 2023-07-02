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
        show: data.show,
        disable: data.disable,
        linear: data.linear,
        text: data.text,
        createNew
    }
    const response = await axios.post(`/api/lesson/spheres`, payload)

}

export default sphereSender