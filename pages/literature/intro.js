import React from 'react'
import NextLessonButton from '../../components/NextLessonButton'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import MainContainer from '../../components/MainContainer'


const Intro = () => {
  const { user } = useUser()
  const router = useRouter()

  return (
    <MainContainer
      smallTitle={true}
      titleText='Intro'
      introText='Placeholder'
    >
      <NextLessonButton
        link='/literature/explication'
        text='Explication'
        user={user ? user.email : 'none'}
        sphere={router.pathname.split('/')[1]}
        path={router.pathname}
      />
    </MainContainer>
  )
}

export default Intro