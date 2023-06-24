import axios from 'axios'

async function answerSender(type, answer, correct, user, attempts, id, sphere, course, lesson) {
    const payload = {
        answer: answer,
        correct: correct.toString(),
        user: user,
        type: type,
        attempt: (attempts + 1).toString(),
        id: id,
        sphere: sphere,
        course: course,
        lesson: lesson
    }

    const response = await axios.post(`/api/user/postAnswer`, payload)

}

export default answerSender