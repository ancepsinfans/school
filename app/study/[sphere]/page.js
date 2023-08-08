
import React from "react";
import { fetchDBStructure, getAnyName } from "@/middleware";
import { Intro, Title, Grid, GridCard } from '@/components/layout'

export async function generateStaticParams() {
    const dbd = await fetchDBStructure({})
    return dbd.map((sphere) => ({
        sphere: sphere.slug
    }))

}

export async function generateMetadata({ params }) {
    const db = await fetchDBStructure({})
    const currentDB = getAnyName(db, params, 1)
    return {
        title: `${currentDB.sphere}`
    }
}

export default async function SpherePage({ params }) {
    const fullDD = await fetchDBStructure({})
    const db = getAnyName(fullDD, params, 1)

    return (
        <>

            <Title>{db.sphere}</Title>
            <Intro>{db.description}</Intro>
            <Grid>
                {
                    db.courses.map(e => {
                        return (
                            <GridCard
                                key={e._id}
                                isDisabled={!e.lessons.length}
                                link={`/study/${db.slug}/${e.slug}`}
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
