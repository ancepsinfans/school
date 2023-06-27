import React from "react";
import styled from "styled-components";
import NavBar from "../NavBar";
import Footer from '../Footer'
import { NextLessonButton } from "../../atomic";
import Header from '../Head'

const MainContainerStyled = styled.div`
 padding: 0 2rem;
`

const MainContent = styled.main`
  min-height: 85vh;
  padding: ${props => props.noFlex ? '2.5rem 0' : '4rem 0'};
  flex: 1;
  display: ${props => props.noFlex ? 'block' : 'flex'};
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
  titleText, introText, noFlex, smallTitle, isProfilePage, isHome, isLesson, nextPage, location, children
}) {
  let nextLesson = null;
  let nextLessonCapitalized = null;
  let ID

  if (isLesson) {
    nextLesson = nextPage.split('/')[nextPage.split('/').length - 1];
    [nextLesson, ID] = nextLesson.split('?')
    nextLesson = nextLesson.split('-').slice(1).join(' ')
    ID = ID.split('=')[1]
    nextLessonCapitalized = nextLesson.charAt(0).toUpperCase() + nextLesson.slice(1);
    nextLessonCapitalized = nextLessonCapitalized.replace('-', ' ');
    if (nextLesson === '') {
      nextLessonCapitalized = 'Complete course!';
    }
  }

  return (
    <>
      <NavBar
        isHome={isHome}
        isProfilePage={isProfilePage} />
      <MainContainerStyled>
        <Header />
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
              link={"/study" + nextPage}
              text={nextLessonCapitalized}
              user={ID}
              location={location} />
            :
            null}
        </MainContent>
        <Footer />
      </MainContainerStyled>
    </>
  );
}

export default MainContainer;
