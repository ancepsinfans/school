import Vocab from './vocab-list';
import { fetchUser, fetchDBStructure } from '../../../middleware';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";

export default async function Page({ searchParams }) {
    const studentInfo = await fetchUser({ ID: searchParams.ID, vocab: 'true' })
    const db = await fetchDBStructure({})
    const { user } = await getServerSession(authOptions)

    return <Vocab
        db={db}
        vocab={studentInfo}
        ID={searchParams.ID}
        user={user}

    />
}