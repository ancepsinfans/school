'use client'
import React from 'react'
import { Title, Intro, Grid, GridCard } from '@/components/layout'
import constants from '@/styles/constants'
import { signIn, useSession } from 'next-auth/react'


export default function Home({ db }) {
    const { data: session } = useSession()

    const user = (!!session ? session.user : undefined)

    const isAdmin =
        (
            user && user.email == 'zachary.r.bullard@gmail.com' ? true : false
        )

    return (

        <>
            <Title>
                Welcome to <span style={{ color: constants.accentRedMain }}>school!</span>
            </Title>
            <Intro>
                <>
                    <p>Knowledge should be accessible.</p>
                    <p>Here you'll find a collection of interesting things.</p>
                    <p>The topics will vary, but the through-line is that these things are meant to spark curiosity.</p>
                </>
            </Intro>
            {user ?
                <>
                    <Grid>

                        <GridCard
                            isAdmin={isAdmin}
                            isRestricted={true}
                            link='/admin/add_q'
                            title='Add questions'
                        />

                        <GridCard
                            isAdmin={isAdmin}
                            isRestricted={true}
                            link='/admin/add_lesson'
                            title='Add lesson text'
                        />

                    </Grid>
                    <hr style={{ backgroundColor: constants.blackMain, margin: '5px', borderStyle: 'solid', width: '100%' }} hidden={!isAdmin} />
                    <Grid>
                        {
                            db.map((e) => {
                                return (
                                    <GridCard
                                        hidden={!e.show}
                                        isDisabled={e.disable}
                                        key={e._id}
                                        link={`/study/${e.slug}`}
                                        title={e.sphere}
                                        description={e.description}
                                    />
                                )
                            })
                        }
                    </Grid >


                </>
                :
                <Grid>
                    <GridCard
                        link=''
                        onClick={() => signIn()}
                        title='Login to get started'
                        description='By logging in it allows us to improve your experience'
                    />
                </Grid>
            }
        </>
        // </MainContainer>
    )
}

