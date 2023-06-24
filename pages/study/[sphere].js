import React from "react";
import { MainContainer, Grid, GridCard } from "../../components/infrastructureComponents";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from '../api/auth/[...nextauth]'
import getStructure from "../../lib/fetchStructure";

const SpherePage = ({ db, ID }) => {
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
                introText={db.description}
            >

                <Grid>

                    {
                        db.courses.map((e, idx) => {
                            return (
                                <GridCard
                                    key={e._id}
                                    isDisabled={!e.lessons.length}
                                    link={`/study/${db.sphere}/${e.course}?ID=${ID}`}
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


export default SpherePage


export const getServerSideProps = async (ctx) => {
    const db = await getStructure()
    const currentDB = db.find((i) => i.sphere === ctx.params.sphere)

    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    if (session === null) {
        return {
            props: {
                db: null,
                ID: null
            }
        }
    }

    const { data } = await axios.get(process.env.BASE_URL + "/api/user/getUser", { params: { email: session.user.email } })

    return {
        props: {
            ID: data,
            db: currentDB
        }
    }
};