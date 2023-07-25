import React from "react";
import { MainContainer, Grid, GridCard } from '../../../../components/meta'
import { fetchDBStructure, fetchUser } from "../../../../middleware";
import { Intro, Title } from '../../../../components/layout'


export default async function SpherePage({ params, searchParams }) {
    const db = await fetchDBStructure({
        sphere: params.sphere,
        course: params.course
    })

    let currentDB
    const currentSphere = db.find((i) => i.slug === params.sphere)
    if (currentSphere.courses.some(item => item.slug === params.course)) {
        currentDB = currentSphere.courses.find((i) => i.slug === params.course)
    }

    const completedLessons = await fetchUser({ distinct: 'progress.lesson', ID: searchParams.ID, sphere: params.sphere, course: params.course })

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
                    currentDB.lessons.map((e) => {
                        return (
                            <GridCard
                                key={e._id}
                                link={`/study/${params.sphere}/${currentDB.slug}/${e.slug}?ID=${searchParams.ID}`}
                                title={e.lesson}
                                description={e.description}
                                completed={completedLessons.includes(e.slug)}
                                isDisabled={e.requirements?.length !== 0 && e.requirements?.every((lesson) => !completedLessons.includes(lesson))}
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
