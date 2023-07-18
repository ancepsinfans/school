'use client'
import React from 'react';
import MainContainer from '../MainContainer/MainContainer';
import Link from 'next/link';

function Loading() {
  return (
    <MainContainer
      navType='other'
      titleText="Loading..."
      introText={
        <>
          If nothing happens, <Link href='/'>click here</Link>.
        </>
      }
    >
    </MainContainer>
  )

}

export default Loading;
