import axios from 'axios'

async function feedbackSender(user, answer, id, sphere, course, lesson) {
    const payload = {
        user: (user ? user : 'unregistered'),
        answer: answer,
        id: id,
        sphere: sphere,
        course: course,
        lesson: lesson,
    }

    const response = await axios.post(`/api/postFeedback`, payload)

}

export default feedbackSender