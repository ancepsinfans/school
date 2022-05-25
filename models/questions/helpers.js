import axios from 'axios'

async function questionSender(desc, options, correct, sphere, good, bad) {
    const payload = {
        desc: desc,
        options: options,
        correct: correct,
        sphere: sphere,
        feedback: {
            good: good,
            bad: bad,
        }
    }
    console.log(payload)

    const response = await axios.post(`/api/questions`, payload)

}


export default questionSender