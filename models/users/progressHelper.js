async function progressSender(user, location) {
    try {
        const payload = {
            user: user,
            location: location,
        };

        const response = await fetch('/api/user/postProgress', {
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

export default progressSender;
