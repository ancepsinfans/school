import axios from 'axios'

async function questionSender(data) {
    const modOpts = data.options.split(', ')
    const payload = {
        desc: data.desc,
        options: modOpts,
        correct: data.correct,
        sphere: data.sphere,
        course: data.course,
        lesson: data.lesson,
        good: data.good,
        bad: data.bad,

    }
    const response = await axios.post(`/api/lesson/questions`, payload)

}


export default questionSender