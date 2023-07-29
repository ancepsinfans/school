
import React from "react";
import { Grid, GridCard } from '../../../components/meta'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { fetchDBStructure } from "../../../middleware";
import { Intro, Title } from '../../../components/layout'

export default async function SpherePage({ params }) {
    const db = await fetchDBStructure({ sphere: params.sphere })

    const { user } = await getServerSession(authOptions)

    const ID = await fetch(process.env.BASE_URL + `/api/user/user?email=${user.email}`).then((response) => {
        return response.json().then((data) => {
            return data;
        }).catch((err) => {
            console.log(err);
        })
    });

    return (
        <>

            <Title>{db[0].sphere}</Title>
            <Intro>{db[0].description}</Intro>
            <Grid>
                {
                    db[0].courses.map(e => {
                        return (
                            <GridCard
                                key={e._id}
                                isDisabled={!e.lessons.length}
                                link={`/study/${db[0].slug}/${e.slug}?ID=${ID}`}
                                title={e.course}
                                description={e.description}
                            />

                        )
                    })
                }

            </Grid>
        </>
    )
}
