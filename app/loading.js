import Link from "next/link"
import { Title, Intro } from "../components/layout"

export default function Loading() {
    return (
        <>
            <Title>
                Loading...
            </Title>
            <Intro>
                If nothing happens, <Link href='/'> click here</Link>.
            </Intro>
        </>
    )
}