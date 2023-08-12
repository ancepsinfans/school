import AddDesc from "./add-lesson-page";
import { fetchDBStructure } from "@/middleware";

export default async function Page() {
    const db = await fetchDBStructure({})
    return <AddDesc db={db} />
}

