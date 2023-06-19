import React from 'react'
import { Grid, GridCard, MainContainer } from '../components/infrastructureComponents'
import constants from '../styles/constants'
import { signIn, useSession } from 'next-auth/react'


export default function Home() {
  const { data: session } = useSession()
  const user = (!!session ? session.user : undefined)
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update
      window.localStorage.setItem('userName', JSON.stringify(user.name))
      window.localStorage.setItem('userEmail', JSON.stringify(user.email))
    }
  }, [user])


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


      <Grid>

        {user ?
          <>

            <GridCard
              isAdmin={isAdmin}
              isRestricted={true}
              link='/add_q'
              title='Add questions'
            />

            <GridCard
              link='/literature'
              title='Literature'
              description='Courses to make your inner bookworm glow'
            />

            <GridCard
              isDisabled={true}
              link=''
              title='Music'
              description='Under construction'
            />

            <GridCard
              isDisabled={true}
              link=''
              title='Science'
              description='Under construction'
            />

            <GridCard
              isDisabled={true}
              link=''
              title='Film'
              description='Under construction'
            />

            <GridCard
              isDisabled={true}
              link=''
              title='Linguistics'
              description='Under construction'
            />

            <GridCard
              isDisabled={true}
              link=''
              title='Math'
              description='Under construction'
            />

            <GridCard
              isDisabled={true}
              link=''
              title='Psychology'
              description='Under construction'
            />

            <GridCard
              isDisabled={true}
              link=''
              title='Food'
              description='Under construction'
            />

            <GridCard
              isDisabled={true}
              link=''
              title='Philosophy'
              description='Under construction'
            />

          </>
          :
          <GridCard
            link=''
            onClick={() => signIn()}
            title='Login to get started'
            description='By logging in it allows us to improve your experience'
          />

        }

      </Grid>
    </MainContainer>
  )
}
