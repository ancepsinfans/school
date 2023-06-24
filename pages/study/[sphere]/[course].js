import React from "react";
import { MainContainer, Grid, GridCard, BlueButton, ButtonMechanics } from "../../../components/infrastructureComponents";
import { useSession } from "next-auth/react";
import getStructure from "../../../lib/fetchStructure";


const CoursePage = ({ sphere, db, ID, sphereName }) => {
    const { status } = useSession()
    if (status === 'loading') {
        return (
            <MainContainer
                navType='other'
                titleText="Loading..."
            >

            </MainContainer>
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

    const db = await getStructure()
    const currentSphere = db.find((i) => i.sphere === ctx.params.sphere)
    const currentDB = currentSphere.courses.find((i) => i.course === ctx.params.course)

    return {
        props: {
            sphere: ctx.params.sphere,
            db: currentDB,
            ID: ctx.query.ID,
            sphereName: currentSphere.name
        }
    }
};