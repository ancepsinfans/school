import React from "react";
import connectMongo from "../../../middleware/connectMongo";
import { StudentSchema } from '../../../models/users/User'
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import MainContainer from "../../../components/MainContainer";
import Grid from "../../../components/Grid";
import GridCard from "../../../components/GridCard";
import Link from "next/link";

const Literature = ({ progress }) => {
    let progressSpheres = new Set()
    let spheresPageCount = {}

    progress.map((e, idx) => {
        progressSpheres.add(e.sphere)
    })

    progressSpheres.forEach((e, idx) => {
        spheresPageCount[e] = new Set()
        progress.map((f, id) => {
            if (f.sphere === e) {
                spheresPageCount[e].add(f.page)
            }
        })
    })

    return (
        <>
            <MainContainer
                navType='other'
                titleText='Lit 101'
                introText={
                    <>
                        <p>A remedial course in literature</p>
                        <Link href='/literature'>
                            <a>Back to the Literature hub</a>
                        </Link>
                    </>
                }
            >
                <Grid>

                    <GridCard
                        link='/literature/101/intro'
                        title='Intro'
                        description='Course overview'
                    />
                    <GridCard
                        isDisabled={
                            spheresPageCount.literature != undefined ?
                                !spheresPageCount.literature.has('intro') :
                                true}
                        link='/literature/101/explication'
                        title='Explication'
                        description='How to ask questions when you read'
                    />
                    <GridCard
                        isDisabled={
                            spheresPageCount.literature != undefined ?
                                !spheresPageCount.literature.has('explication') :
                                true}
                        link='/literature/101/close-reading'
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

            const progress = await StudentSchema.findOne({ user: auth0user.user.email })
            return {
                props: {
                    user: auth0user,
                    progress: JSON.parse(JSON.stringify(progress)).progress
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

