import axios from 'axios'

async function questionSender(desc, options, correct, sphere, course, lesson, id, good, bad) {
    const payload = {
        desc: desc,
        options: options,
        correct: correct,
        sphere: sphere,
        course: course,
        lesson: lesson,
        id: id,
        good: good,
        bad: bad,

    }

    const response = await axios.post(`/api/lesson/questions`, payload)

}


export default questionSender