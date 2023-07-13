import React from "react";
import { MainContainer, Grid, Loading } from "../../components/meta";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from '../api/auth/[...nextauth]'
import { fetchDBStructure } from "../../middleware";

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
                titleText={db.sphere}
                introText={db.description}
            >

                <Grid>
                    {
                        db.courses.map(e => {
                            return (
                                <Grid.GridCard
                                    key={e._id}
                                    isDisabled={!e.lessons.length}
                                    link={`/study/${db.slug}/${e.slug}?ID=${ID}`}
                                    title={e.course}
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

    const db = await fetchDBStructure({ sphere: ctx.params.sphere })
    let currentDB
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    if (session === null) {
        return {
            props: {
                broken: true
            }
        }
    }
    if (db.some(item => item.slug === ctx.params.sphere)) {
        currentDB = db.find((i) => i.slug === ctx.params.sphere)
    } else {
        return {
            redirect: { destination: '/404', permanent: false }
        }
    }

    const { data } = await axios.get(process.env.BASE_URL + "/api/user/user", { params: { email: session.user.email } })

    return {
        props: {
            ID: data,
            db: currentDB || db
        }
    }
};