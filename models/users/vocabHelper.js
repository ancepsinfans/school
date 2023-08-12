async function vocabSender(user, term, location) {
    try {
        const [sphere, course, lesson] = location;

        const payload = {
            user: user,
            term: term,
            sphere: sphere,
            course: course,
            lesson: lesson,
        };

        const response = await fetch('/api/user/postVocab', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default vocabSender;
