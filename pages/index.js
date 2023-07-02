import React from 'react'
import { Grid, GridCard, MainContainer } from '../components/meta'
import constants from '../styles/constants'
import { signIn, useSession } from 'next-auth/react'
import { fetchDBStructure } from '../middleware';


export default function Home({ db, ID }) {
  const { data: session } = useSession()

  const user = (!!session ? session.user : undefined)

  const isAdmin =
    (
      user && user.email == 'zachary.r.bullard@gmail.com' ? true : false
    )

  return (
    <MainContainer
      isHome={true}
      navType='home'
      titleText={
        <>
          Welcome to <span style={{ color: constants.accentRedMain }}>school!</span>
        </>
      }
      introText={
        <>
          <p>Knowledge should be accessible.</p>
          <p>Here you'll find a collection of interesting things.</p>
          <p>The topics will vary, but the through-line is that these things are meant to spark curiosity.</p>
        </>
      }
    >



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
              link='/admin/add_descriptions'
              title='Add course descriptions'
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
                    link={`/study/${e.sphere}`}
                    title={e.name}
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

    </MainContainer>
  )
}

export const getServerSideProps = async (ctx) => {
  const db = await fetchDBStructure()


  return {
    props: {
      db: db,
    }
  }
};

