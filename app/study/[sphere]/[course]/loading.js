import React from "react";
import { Title, Intro, Grid, GridCard } from "@/components/layout";
import Link from "next/link";

export default function CourseLoading() {
    return (
        <>

            <Title >
                Title goes here
            </Title>
            <Intro>
                <div>
                    <p>
                        Lorem Ipsum
                    </p>
                    <p>
                        Back to the <Link href={`/`}>previous page</Link>
                    </p>
                </div>
            </Intro>
            <Grid>
                <GridCard
                    link={`/`}
                    title='Loading...'
                    description='give me a second'
                    isDisabled={true} />


            </Grid>


        </>
    )
}