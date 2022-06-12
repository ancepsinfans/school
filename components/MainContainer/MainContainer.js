import React from "react";
import styled from "@emotion/styled";
import NavBarController from "../NavBar/NavBarController";
import Image from "next/image";
import Head from "next/head";

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


const MainContainer = ({ navType, titleText, introText, noFlex, smallTitle, isProfilePage, children }) => {
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
