import axios from 'axios'

async function feedbackSender(user, answer, id, path) {

    const payload = {
        user: user,
        answer: answer,
        id: id,
        sphere: path[0],
        course: path[1],
        lesson: path[2],
    }
    const response = await axios.post(`/api/user/postFeedback`, payload)

}

export default feedbackSender