import React from "react";
import { MainContainer, Grid, GridCard, Loading } from "../../components/meta";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from '../api/auth/[...nextauth]'
import getStructure from "../../middleware/fetchStructure";

const SpherePage = ({ db, ID, broken }) => {
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
                introText={db.description}
            >

                <Grid>
                    {
                        db.courses.map(e => {
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

                </Grid>
            </MainContainer>
        </>
    )
}

export default SpherePage


export const getServerSideProps = async (ctx) => {

    const db = await getStructure()
    let currentDB
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    if (session === null) {
        return {
            props: {
                broken: true
            }
        }
    }
    if (db.some(item => item.sphere === ctx.params.sphere)) {
        currentDB = db.find((i) => i.sphere === ctx.params.sphere)
    } else {
        return {
            redirect: { destination: '/404', permanent: false }
        }
    }

    const { data } = await axios.get(process.env.BASE_URL + "/api/user/getUser", { params: { email: session.user.email } })

    return {
        props: {
            ID: data,
            db: currentDB || db
        }
    }
};