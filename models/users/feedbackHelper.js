async function feedbackSender(user, answer, id, path) {
    try {
        const payload = {
            user: user,
            answer: answer,
            id: id,
            sphere: path[0],
            course: path[1],
            lesson: path[2],
        };

        const response = await fetch('/api/user/postFeedback', {
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

export default feedbackSender;
