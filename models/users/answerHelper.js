import axios from 'axios'

async function answerSender(type, answer, user, attempts, question) {
    const payload = {
        answer: answer,
        correct: question.correct,
        user: user,
        type: type,
        attempt: (attempts + 1).toString(),
        id: question.id,
        sphere: question.sphere,
        course: question.course,
        lesson: question.lesson
    }

    const response = await axios.post(`/api/user/postAnswer`, payload)

}

export default answerSender