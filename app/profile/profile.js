'use client'
import React from 'react';
import Image from 'next/image';
import styles from './Profile.module.css'
import { Title, Grid, GridCard } from '@/components/layout';


export default function Profile({ ID, user }) {

    return (
        <>
            <Title
                smallTitle={true}>
                <div className={styles.image}>
                    {user?.image ? <Image src={user.image} width={50} height={50} alt="avatar" /> : null}
                    <h4>{user?.name}</h4>
                </div>
            </Title>

            <Grid>
                <GridCard
                    link={`/profile/vocab-list?ID=${ID}`}
                    title='Vocabulary List'
                    description="Here are all the words you've marked"
                />
                <GridCard
                    link={`/profile/analytics?ID=${ID}`}
                    title='Your Analytics'
                    description='Here you can find data about your study history'
                />
            </Grid>
        </>
    )
}

