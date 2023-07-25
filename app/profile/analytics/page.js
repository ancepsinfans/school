import Analytics from './analytics';
import { fetchUser, fetchDBStructure } from '../../../middleware';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";

export default async function Page({ searchParams }) {
    const studentInfo = await fetchUser({ ID: searchParams.ID, answers: 'true', progress: 'true' })
    const db = await fetchDBStructure({})
    const { user } = await getServerSession(authOptions)

    return <Analytics
        paths={db}
        studentInfo={studentInfo}
        ID={searchParams.ID}
        user={user}

    />
}