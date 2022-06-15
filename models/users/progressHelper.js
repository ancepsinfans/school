import axios from 'axios'

async function progressSender(user, sphere, course, page) {
    const payload = {
        user: (user ? user : 'unregistered'),
        course: course,
        sphere: sphere,
        page: page,
    }

    const response = await axios.post(`/api/postProgress`, payload)

}

export default progressSender