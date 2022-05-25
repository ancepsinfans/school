import axios from 'axios'

async function answerSender(type, data, correct, user, attempts) {
    const payload = {
        answer: data,
        correct: correct.toString(),
        user: (user ? user : 'unregistered'),
        type: type,
        attempt: (attempts + 1).toString()
    }
    console.log(payload)

    const response = await axios.post(`/api/postAnswer`, payload)

}

export default answerSender