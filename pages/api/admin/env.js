export default function handler(req, res) {
    const { BASE_URL } = process.env;

    res.status(200).json({ url: BASE_URL });
}
