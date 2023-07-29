'use client'
import React from 'react';
import Image from 'next/image';
import { getCourseName, getLessonName, getSphereName } from '@/middleware';
import styles from './Vocab.module.css'
import { Title, Grid, GridCard } from '@/components/layout';




export default function Vocab({ ID, vocab, user, db }) {



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
                            link={`/study/${e.sphere}/${e.course}/${e.lesson}?ID=${ID}`}
                            title={e.term.term}
                            description={e.term.definition}
                            lessonDetails={<aside style={{ color: 'var(--black40)' }}>{`${sphereName} > ${courseName} > ${lessonName}`}</aside>}
                        />

                    );
                })}

            </Grid>
        </>
    );
}

