import React from "react";
import connectMongo from "../../middleware/connectMongo";
import { StudentSchema } from '../../models/users/User'
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import MainContainer from "../../components/MainContainer";
import Grid from "../../components/Grid";
import GridCard from "../../components/GridCard";

const Literature = () => {


    return (
        <>
            <MainContainer
                navType='other'
                titleText='Literature'
                introText='The hub for reading'
            >

                <Grid>
                    <GridCard
                        link='/literature/101'
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


