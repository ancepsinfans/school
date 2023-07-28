async function answerSender(type, answer, user, attempts, question) {
    try {
        const payload = {
            answer: answer,
            correct: question.correct,
            user: user,
            type: type,
            attempt: (attempts + 1).toString(),
            id: question.id,
            sphere: question.sphere,
            course: question.course,
            lesson: question.lesson,
        };

        const response = await fetch('/api/user/postAnswer', {
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

export default answerSender;
