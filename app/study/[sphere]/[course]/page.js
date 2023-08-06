import React from "react";
import { fetchDBStructure, lessonCompleted, lessonDisabled } from "@/middleware";
import { Intro, Title, Grid, GridCard } from '@/components/layout'
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

// export const dynamic = 'force-static'
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

export default async function SpherePage({ params }) {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.BASE_URL}/api/user/user?email=${session.user.email}`);
    const ID = await response.json();

    const db = await fetchDBStructure({
        sphere: params.sphere,
        course: params.course
    })

    let currentDB
    const currentSphere = db.find((i) => i.slug === params.sphere)
    if (currentSphere.courses.some(item => item.slug === params.course)) {
        currentDB = currentSphere.courses.find((i) => i.slug === params.course)
    }

    return (
        <>

            <Title >
                {currentDB.course}
            </Title>
            <Intro>
                <>
                    {currentDB.description}
                    <br />
                    <br />
                    Back to the <a href={`/study/${params.sphere}`}>{db[0].sphere} page</a>
                </>
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
