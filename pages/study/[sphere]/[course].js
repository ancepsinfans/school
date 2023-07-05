import React from "react";
import { MainContainer, Grid, GridCard, Loading } from "../../../components/meta";
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
                titleText={db.name}
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
                            return (
                                <GridCard
                                    key={e._id}
                                    link={`/study/${sphere}/${db.course}/${e.lesson}?ID=${ID}`}
                                    title={e.name}
                                    description={e.description}
                                    completed={completedLessons.includes(e.lesson)}
                                    disabled={false}
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
    const db = await fetchDBStructure({sphere: ctx.params.sphere, course: ctx.params.course})
    let currentDB
    const currentSphere = db.find((i) => i.sphere === ctx.params.sphere)
    if (currentSphere.courses.some(item => item.course === ctx.params.course)) {
        currentDB = currentSphere.courses.find((i) => i.course === ctx.params.course)
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

    const completedLessons = await fetchUser( {distinct: 'progress.lesson', ID: ctx.query.ID, sphere: ctx.params.sphere, course: ctx.params.course})
    
   

    return {
props: {
            sphere: ctx.params.sphere,
            db: currentDB,
            ID: ctx.query.ID,
            sphereName: currentSphere.name,
            completedLessons: completedLessons
        }
    }
};