'use client'
import React from "react";
import styled from "styled-components";
import NavBar from "../../layout/NavBar";
import { NextLessonButton } from "../../atomic";
import { usePathname } from 'next/navigation'

const MainContainerStyled = styled.div`
 padding: 0 2rem;
`

const MainContent = styled.main`
  min-height: 85vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Title = styled.h1`
  text-align: center;
  margin: ${props => props.smallTitle ? '0px auto' : '30px auto'};
  line-height: 1.15;
  font-size: ${props => props.smallTitle ? '2.5rem' : '4rem'};
`

const Intro = styled.div`
  margin-bottom: 25px;
  font-size: 1.25rem;
  max-width: 850px;
  text-align: center;
`


function MainContainer({
  titleText, introText, smallTitle, isLesson, nextPage, location, children
}) {
  const pathname = usePathname()

  const isHome = pathname === '/' || pathname.includes('study')
  let ID

  if (isLesson) {
    ID = nextPage.link.split('?')[1]
    ID = ID.split('=')[1]

  }

  return (
    <>
      {isHome ? null : <NavBar />}
      <MainContainerStyled>
        <MainContent >
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
              link={"/study" + nextPage.link}
              text={nextPage.name}
              user={ID}
              location={location} />
            :
            null}
        </MainContent>
      </MainContainerStyled>
    </>
  );
}

export default MainContainer;
