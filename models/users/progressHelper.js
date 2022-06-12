import axios from 'axios'

async function progressSender(user, sphere, page) {
    const payload = {
        user: (user ? user : 'unregistered'),
        sphere: sphere,
        page: page,
    }
    console.log(payload)

    const response = await axios.post(`/api/postProgress`, payload)

}

export default progressSender