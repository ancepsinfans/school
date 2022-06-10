
import { useUser } from '@auth0/nextjs-auth0'
import GridCard from '../components/GridCard'
import Grid from '../components/Grid'
import MainContainer from '../components/MainContainer'
import constants from '../styles/constants'


export default function Home() {
  const { user } = useUser()
  const isAdmin = (
    user && user.email == 'zachary.r.bullard@gmail.com' ? null : 'none'
  )

  return (
    <MainContainer
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
              link='/quiz'
              title='Quiz sandbox'
            />

            <GridCard
              isAdmin={isAdmin}
              link='/add_q'
              title='Add questions'
            />

            <GridCard
              link='/literature'
              title='Literature'
            />

            <GridCard
              link=''
              title='Placeholder'
            />

            <GridCard
              link=''
              title='Placeholder'
            />

          </>
          :
          <GridCard
            link='/api/auth/login'
            title='You should login first'
          />

        }

      </Grid>
    </MainContainer>
  )
}
