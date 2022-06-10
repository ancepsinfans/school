import React from "react";
import connectMongo from "../middleware/connectMongo";
import StudentProgress from '../models/progress/Progress'
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import MainContainer from "../components/MainContainer";
import Grid from "../components/Grid";
import GridCard from "../components/GridCard";

const Literature = ({ user, progress }) => {

    /* Progress logic */
    let progressSpheres = new Set()
    let spheresPageCount = {}

    progress.map((e, idx) => {
        const [a, b] = e.page.split('/').slice(1)
        spheresPageCount[a] = []
        progressSpheres.add(e.sphere)
    })

    progressSpheres = Array.from(progressSpheres)

    progress.map((e, idx) => {
        const [a, b] = e.page.split('/').slice(1)
        spheresPageCount[a].push(b)
    })

    return (
        <>
            <MainContainer
                navType='other'
                titleText='Literature'
                introText='A remedial course in literature'
            >
                <Grid>
                    <GridCard
                        link='/literature/intro'
                        title='Intro'
                        description='Course overview'
                    />
                    <GridCard
                        link='/literature/explication'
                        title='Explication'
                        description='How to ask questions when you read'
                    />
                    <GridCard
                        link='/literature/close-reading'
                        title='Close reading'
                        description='Breaking down a story and getting blood from the turnip'
                    />
                </Grid>
            </MainContainer>
        </>
    )
}


export default Literature


export const getServerSideProps = withPageAuthRequired({

    getServerSideProps: async ({ req, res }) => {

        const auth0user = getSession(req, res)

        try {
            await connectMongo()

            const progress = await StudentProgress.find({ user: auth0user.user.email })

            return {
                props: {
                    progress: JSON.parse(JSON.stringify(progress)),
                }
            }
        } catch (error) {
            console.log('oops')
            console.log(error)

            return {
                notFound: true
            }
        }
    }
});

