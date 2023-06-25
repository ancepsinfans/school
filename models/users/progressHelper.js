import axios from 'axios'

async function progressSender(user, location) {


    const payload = {
        user: user,
        location: location
    }
    const response = await axios.post(`/api/user/postProgress`, payload)

}

export default progressSender