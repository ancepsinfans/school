import axios from 'axios'

async function answerSender(type, data, correct, user, attempts, id, sphere) {
    const payload = {
        answer: data,
        correct: correct.toString(),
        user: (user ? user : 'unregistered'),
        type: type,
        attempt: (attempts + 1).toString(),
        id: id,
        sphere: sphere,
    }

    const response = await axios.post(`/api/postAnswer`, payload)

}

export default answerSender