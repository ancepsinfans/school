async function questionSender(data) {
    try {
        const modOpts = data.options.split(', ');
        const payload = {
            desc: data.desc,
            options: modOpts,
            correct: data.correct,
            sphere: data.sphere,
            course: data.course,
            lesson: data.lesson,
            good: data.good,
            bad: data.bad,
        };

        const response = await fetch('/api/lesson/questions', {
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

export default questionSender;
