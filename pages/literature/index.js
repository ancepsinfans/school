import React from "react";
import { MainContainer, Grid, GridCard } from "../../components/infrastructureComponents";
import { useSession } from "next-auth/react";

const Literature = () => {
    const { data: session } = useSession()

    return (
        <>
            <MainContainer
                navType='other'
                titleText='Literature'
                introText='The hub for reading'
            >

                <Grid>
                    <GridCard
                        link={`/literature/101?email=${session.user.email}`}
                        title='Lit 101'
                        description='A remedial course in literature'
                    />

                    <GridCard
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
                    />

                </Grid>
            </MainContainer>
        </>
    )
}


export default Literature


