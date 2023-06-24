import axios from 'axios'

async function vocabSender(user, term, location) {
    let sphere, course, lesson
    [sphere, course, lesson] = location

    const payload = {
        user: user,
        term: term,
        sphere: sphere,
        course: course,
        lesson: lesson,
    }
    const response = await axios.post(`/api/user/postVocab`, payload)

}

export default vocabSender