import Home from "./home-page";
import { fetchDBStructure } from "../middleware";

export default async function Page() {
    const db = await fetchDBStructure({})
    return <Home db={db} />
}


// <G