import React from "react";
import { fetchDBStructure, lessonCompleted, lessonDisabled, deslugify, getAnyName } from "@/middleware";
import { Intro, Title, Grid, GridCard } from '@/components/layout'
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import Link from "next/link";

export async function generateStaticParams() {
    const dbd = await fetchDBStructure({})
    const text = dbd.map(
        sphere => {
            return sphere.courses.map(course => {
                return {
                    sphere: sphere.slug,
                    course: course.slug
                }
            })
        }
    )

    return text[0]

}

export async function generateMetadata({ params }) {
    const db = await fetchDBStructure({})
    const currentDB = getAnyName(db, params, 2)

    return {
        title: `${currentDB.course}`
    }
}

export default async function SpherePage({ params }) {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.BASE_URL}/api/user/user?email=${session.user.email}`);
    const ID = await response.json();
    const db = await fetchDBStructure({})
    const currentDB = getAnyName(db, params, 2)

    return (
        <>

            <Title >
                {currentDB.course}
            </Title>
            <Intro>
                <div>
                    <p>
                    {currentDB.description}
                    </p>
                    <p>
                        Back to the <Link href={`/study/${params.sphere}`}>{db[0].sphere} page</Link>
                    </p>
                </div>
            </Intro>

            <Grid>


                {
                    currentDB.lessons.map(async (e) => {

                        return (
                            <GridCard
                                key={e._id}
                                link={`/study/${params.sphere}/${currentDB.slug}/${e.slug}`}
                                title={e.lesson}
                                description={e.description}
                                completed={await lessonCompleted(ID, params.sphere, params.course, e.slug)}
                                isDisabled={await lessonDisabled(ID, params.sphere, params.course, e.requirements)}
                                lessonDetails={
                                    <>
                                        <aside>{e.readingTime} mins &mdash; {e.cefrLevel}</aside>
                                    </>
                                }
                            />
                        )
                    })
                }

            </Grid>


        </>
    )
}
