import axios from 'axios'

async function progressSender(user, sphere, course, lesson) {
    const payload = {
        user: user,
        course: course,
        sphere: sphere,
        lesson: lesson,
    }
    const response = await axios.post(`/api/user/postProgress`, payload)

}

export default progressSender