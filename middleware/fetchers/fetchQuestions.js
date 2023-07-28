export default async function fetchQuestions(options = null) {
    try {
        let url = `${process.env.BASE_URL}/api/lesson/questions`;

        if (options !== null) {
            const urlParams = new URLSearchParams(options);
            url = `${url}?${urlParams.toString()}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const qs = data.data;
        return qs;
    } catch (error) {
        console.error('Error fetching lesson page:', error);
        throw error;
    }
}