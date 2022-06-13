import React from "react";
import styled from "@emotion/styled";
import NavBarController from "../NavBar/NavBarController";
import Image from "next/image";
import Head from "next/head";
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import NextLessonButton from "../NextLessonButton";
import next from "next";

const MainContainerStyled = styled.div`
 padding: 0 2rem;
`

const MainContent = styled.main`
  min-height: 85vh;
  padding: ${props => props.noFlex ? '2.5rem 0' : '5rem 0'};
  flex: 1;
  display: ${props => props.noFlex ? 'block' : 'flex'};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Title = styled.h1`
  text-align: center;
  margin: 30px auto;
  line-height: 1.15;
  font-size: ${props => props.smallTitle ? '2.5rem' : '4rem'};
`

const Intro = styled.div`
  margin-bottom: 25px;
  font-size: 1.25rem;
  max-width: 850px;
  text-align: center
`

const Footer = styled.footer`
  & {
    display: flex;
    flex: 1;
    padding: 2rem 0;
    border-top: 1px solid var(--accentBlueMain);
    justify-content: center;
    align-items: center;
}

& a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

`


const MainContainer = ({
  navType,
  titleText,
  introText,
  noFlex,
  smallTitle,
  isProfilePage,
  isLesson,
  nextPage,
  children
}) => {

  const { user } = useUser()
  const router = useRouter()
  let nextLesson = null
  let nextLessonCapitalized = null

  if (isLesson) {
    nextLesson = nextPage.split('/')[nextPage.split('/').length - 1]
    nextLessonCapitalized = nextLesson.charAt(0).toUpperCase() + nextLesson.slice(1)
    nextLessonCapitalized = nextLessonCapitalized.replace('-', ' ')
    if (nextLesson === '') {
      nextLessonCapitalized = 'Complete course!'
    }
  }

  return (
    <>
      <NavBarController
        type={navType}
        isProfilePage={isProfilePage}
      />
      <MainContainerStyled>
        <Head>
          <title>School</title>
          <meta name="description" content="Because education can be better" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainContent noFlex={noFlex}
        >
          <Title
            smallTitle={smallTitle}
          >
            {titleText}
          </Title>
          <Intro>
            {introText}
          </Intro>
          {children}
          {isLesson ?
            <NextLessonButton
              link={nextPage}
              text={nextLessonCapitalized}
              user={user ? user.email : 'none'}
              sphere={router.pathname.split('/')[1]}
              course={router.pathname.split('/')[2]}
              page={router.pathname.split('/')[3]}
            /> :
            null}
        </MainContent>

        <Footer>
          <a
            style={{ textDecoration: 'none' }}
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span style={{
              height: '1em',
              marginLeft: '0.5rem'
            }}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>

        </Footer>
      </MainContainerStyled>
    </>
  );
};

export default MainContainer;
