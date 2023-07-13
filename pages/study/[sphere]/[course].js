import React from "react";
import { MainContainer, Grid, Loading } from "../../../components/meta";
import { useSession } from "next-auth/react";
import { fetchDBStructure, fetchUser } from "../../../middleware";

const CoursePage = ({ sphere, db, ID, sphereName, completedLessons, broken }) => {
    const { status } = useSession()
    if (status === 'loading' | broken) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <MainContainer
                navType='other'
                titleText={db.course}
                introText={
                    <>
                        {db.description}
                        <br />
                        <br />
                        Back to the <a href={`/study/${sphere}`}>{sphereName} page</a>
                    </>
                }
            >

                <Grid>


                    {
                        db.lessons.map((e) => {
                            console.log(!!e.requirements.length)
                            return (
                                <Grid.GridCard
                                    key={e._id}
                                    link={`/study/${sphere}/${db.slug}/${e.slug}?ID=${ID}`}
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

            </MainContainer>
        </>
    )
}


export default CoursePage


export const getServerSideProps = async (ctx) => {
    const db = await fetchDBStructure({ sphere: ctx.params.sphere, course: ctx.params.course })

    let currentDB
    const currentSphere = db.find((i) => i.slug === ctx.params.sphere)
    if (currentSphere.courses.some(item => item.slug === ctx.params.course)) {
        currentDB = currentSphere.courses.find((i) => i.slug === ctx.params.course)
    } else {
        return {
            redirect: { destination: '/404', permanent: false }
        }
    }
    if (!ctx.query.ID) {
        return {
            props: {
                broken: true
            }
        }
    }

    const completedLessons = await fetchUser({ distinct: 'progress.lesson', ID: ctx.query.ID, sphere: ctx.params.sphere, course: ctx.params.course })


    return {
        props: {
            sphere: ctx.params.sphere,
            db: currentDB,
            ID: ctx.query.ID,
            sphereName: currentSphere.sphere,
            completedLessons: completedLessons
        }
    }
};