import Profile from './profile';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page({ searchParams }) {
    const { user } = await getServerSession(authOptions)

    return <Profile user={user} ID={searchParams.ID} />
}