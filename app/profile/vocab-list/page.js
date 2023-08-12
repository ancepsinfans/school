import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import React from 'react';
import Image from 'next/image';
import { getCourseName, getLessonName, getSphereName, fetchUser, fetchDBStructure } from '@/middleware';
import styles from './Vocab.module.css'
import { Title, Grid, GridCard } from '@/components/layout';


export default async function Page({ searchParams }) {
    const vocab = await fetchUser({ ID: searchParams.ID, vocab: 'true' })
    const db = await fetchDBStructure({})
    const { user } = await getServerSession(authOptions)

    return (
        <>

            <Title smallTitle>
                <div className={styles.image}>
                    {user.image ? <Image src={user.image} width={50} height={50} alt="avatar" /> : null}
                    <h4>{user.name}</h4>
                </div>
            </Title>
            <Grid>
                {vocab.map(e => {
                    const sphereName = getSphereName(db, e, undefined, 'sphere')
                    const courseName = getCourseName(db, e, undefined, 'course')
                    const lessonName = getLessonName(db, e, undefined, 'lesson')
                    return (
                        <GridCard
                            key={e._id}
                            link={`/study/${e.sphere}/${e.course}/${e.lesson}?ID=${searchParams.ID}`}
                            title={e.term.term}
                            description={e.term.definition}
                            lessonDetails={<aside >{`${sphereName} > ${courseName} > ${lessonName}`}</aside>}
                        />

                    );
                })}

            </Grid>
        </>
    )


}



