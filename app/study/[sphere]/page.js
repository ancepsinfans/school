
import React from "react";
import { MainContainer, Grid, GridCard } from '../../../components/meta'
import { getServerSession } from "next-auth/next";
import { fetchDBStructure } from "../../../middleware";
import { authOptions } from "../../api/auth/[...nextauth]/route";

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
            <MainContainer
                navType='other'
                titleText={db[0].sphere}
                introText={db[0].description}
            >
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
            </MainContainer>
        </>
    )
}
