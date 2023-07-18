import Home from "./home-page";
import { fetchDBStructure } from "../middleware";

async function getDatabase() {
    const db = await fetchDBStructure({})
    return db
}

export default async function Page() {
    // Fetch data directly in a Server Component
    const db = await getDatabase()
    // Forward fetched data to your Client Component
    return <Home db={db} />
}
