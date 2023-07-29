
export default async function fetchUser(options) {
    try {
        const urlParams = new URLSearchParams(options);
        const url = `${process.env.BASE_URL}/api/user/user?${urlParams.toString()}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
