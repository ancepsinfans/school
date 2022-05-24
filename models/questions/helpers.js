import axios from 'axios'

async function questionSender(desc, options, correct, good, bad) {
    const payload = {
        desc: desc,
        options: options,
        correct: correct,
        feedback: {
            good: good,
            bad: bad,
        }
    }
    console.log(payload)

    const response = await axios.post('/api/questions', payload)

}

async function questionGetter() {
    return await axios.get('/api/questions')
}


export default questionSender
export { questionGetter }
