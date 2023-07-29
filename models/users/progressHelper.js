async function progressSender(user, location) {
    try {
        const payload = {
            user: user,
            location: location,
        };
        console.log({ payload })
        const response = await fetch('/api/user/postProgress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        console.log({ response })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default progressSender;
