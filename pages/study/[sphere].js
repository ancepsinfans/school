import React from "react";
import { MainContainer, Grid, GridCard } from "../../components/infrastructureComponents";
import { useSession } from "next-auth/react";
import getStructure from "../../lib/fetchStructure";

const Literature = ({ db }) => {
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
                        db.courses.map((e, idx) => {
                            return (
                                <GridCard
                                    key={e._id}
                                    isDisabled={!e.lessons.length}
                                    link={`/study/${db.sphere}/${e.course}?email=${email}`}
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
    const currentDB = db.find((i) => i.sphere === params.sphere)

    return {
        props: {

            db: currentDB
        }
    }
};