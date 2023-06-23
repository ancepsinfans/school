import React from "react";
import { MainContainer, Grid, GridCard } from "../../../components/infrastructureComponents";
import { useSession } from "next-auth/react";
import getStructure from "../../../lib/fetchStructure";

const Literature = ({ sphere, db }) => {
    const { data: session } = useSession()
    const email = session?.user.email
    return (
        <>
            <MainContainer
                navType='other'
                titleText={db.name}
                introText={db.description}
            >

                <Grid>


                    {
                        db.lessons.map((e) => {
                            return (
                                <GridCard
                                    key={e._id}
                                    link={`/study/${sphere}/${db.course}/${e.lesson}?email=${email}`}
                                    title={e.name}
                                    description={e.description}
                                />
                            )
                        })
                    }


                    {/* <GridCard
                        isDisabled={true}
                        link=''
                        title='Reading in Translation'
                        description='Under construction'
                    />
                    <GridCard
                        isDisabled={true}
                        link=''
                        title='A Primer to Short Fiction'
                        description='Under construction' />
                    <GridCard
                        isDisabled={true}
                        link=''
                        title='Intro to Poetry'
                        description='Under construction'
                    /> */}

                </Grid>
            </MainContainer>
        </>
    )
}


export default Literature


export const getServerSideProps = async ({ params }) => {
    const db = await getStructure()
    const currentSphere = db.find((i) => i.sphere === params.sphere)
    const currentDB = currentSphere.courses.find((i) => i.course === params.course)

    return {
        props: {
            sphere: params.sphere,
            db: currentDB
        }
    }
};