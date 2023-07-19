import Home from "./home-page";
import { fetchDBStructure } from "../middleware";

async function getDatabase() {
    const db = await fetchDBStructure({})
    return db
}

export default async function Page() {
    const db = await getDatabase()
    return <Home db={db} />
}


// <G