
import React from "react";
import { fetchDBStructure } from "@/middleware";
import { Intro, Title, Grid, GridCard } from '@/components/layout'

export async function generateStaticParams() {
    const dbd = await fetchDBStructure({})
    return dbd.map((sphere) => ({
        sphere: sphere.slug
    }))

}

export default async function SpherePage({ params }) {
    const db = await fetchDBStructure({ sphere: params.sphere })

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
                                link={`/study/${db[0].slug}/${e.slug}`}
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
