import React, { Suspense } from "react";
import connectMongo from "../../../middleware/connectMongo";
import { StudentSchema } from '../../../models/users/User'
import { MainContainer, Grid, GridCard, Loading, ButtonMechanics } from "../../../components/infrastructureComponents";
import constants from '../../../styles/constants'
import Link from "next/link";
import { useSession } from "next-auth/react";

const Literature = ({ progress }) => {
    const { data: session } = useSession()
    let progressSpheres = new Set()
    let spheresPageCount = {}

    progress.map((e, idx) => {
        progressSpheres.add(e.sphere)
    })

    progressSpheres.forEach((e, idx) => {
        spheresPageCount[e] = new Set()
        progress.map((f, id) => {
            if (f.sphere === e) {
                spheresPageCount[e].add(f.lesson)
            }
        })
    })

    return (
        <Suspense fallback={Loading}>
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
                        link={`/literature/101/intro?email=${session.user.email}`}
                        title='Intro'
                        description='Course overview'
                    />
                    <GridCard
                        isDisabled={
                            spheresPageCount.literature != undefined ?
                                !spheresPageCount.literature.has('intro') :
                                true}
                        link={`/literature/101/explication?email=${session.user.email}`}
                        title='Explication'
                        description='How to ask questions when you read'
                    />
                    <GridCard
                        isDisabled={
                            spheresPageCount.literature != undefined ?
                                !spheresPageCount.literature.has('explication') :
                                true}
                        link={`/literature/101/close-reading?email=${session.user.email}`}
                        title='Close reading'
                        description='Breaking down a story and getting blood from the turnip'
                    />
                </Grid>
            </MainContainer>
        </Suspense>
    )
}


export default Literature


export const getServerSideProps = async ({ req, res, query }) => {

    console.log({ email: query.email })
    try {
        await connectMongo()

        const progress = await StudentSchema.findOne({
            user: query.email
        }, {
            progress: 1
        })


        return {
            props: {
                user: (!!progress ? query.email : null),
                progress: (!!progress ? JSON.parse(JSON.stringify(progress)).progress : [])
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
    ;

