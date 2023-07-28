export default async function fetchDBStructure(params) {
    const BASE_URL = process.env.BASE_URL
    let dbData

    // Create a URLSearchParams object from the params object (if params exist)
    const urlParams = params ? new URLSearchParams(params) : null;

    // Build the URL with the query parameters (if params exist)
    const url = params ? `${BASE_URL}/api/lesson/spheres?${urlParams.toString()}` : `${BASE_URL}/api/lesson/spheres`;

    try {

        const response = await fetch(url)
        dbData = response.data;
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response (if params exist)
        dbData = params ? await response.json() : null;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

    return dbData;
}








