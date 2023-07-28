async function sphereSender(data, createNew) {
    try {
        const payload = {
            sphere: data.sphere,
            course: data.course,
            lesson: data.lesson,
            slug: data.slug,
            description: data.desc,
            show: data.show,
            disable: data.disable,
            linear: data.linear,
            text: data.text,
            number: data.number,
            requirements: data.requirements,
            createNew,
        };

        const response = await fetch('/api/lesson/spheres', {
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

export default sphereSender;
