import React from "react";
import { Title, Intro, Grid, GridCard } from "@/components/layout";
import Link from "next/link";
import { deslugify } from "@/middleware/deslugify";

export default function CourseLoading({ params }) {
    return (
        <>

            <Title >
                {deslugify(params.course)}
            </Title>
            <Intro>
                <div>
                    <p>
                        Lorem Ipsum
                    </p>
                    <p>
                        Back to the <Link href={`/study/${params.sphere}`}>{deslugify(params.sphere)} page</Link>
                    </p>
                </div>
            </Intro>
            <Grid>
                <GridCard
                    link={`/study/${params.sphere}/${params.course}`}
                    title='Loading...'
                    description='give me a second'
                    isDisabled={true} />


            </Grid>


        </>
    )
}