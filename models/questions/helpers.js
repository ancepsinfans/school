import axios from 'axios'

async function questionSender(desc, options, correct, sphere, id, good, bad) {
    const payload = {
        desc: desc,
        options: options,
        correct: correct,
        sphere: sphere,
        id: id,
        good: good,
        bad: bad,

    }

    const response = await axios.post(`/api/questions`, payload)

}


export default questionSender