import React from 'react';
import Head from 'next/head';

function Header() {
  return (
    <>
      <Head>
        <title>School</title>
        <meta name="description" content="Because education can be better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

export default Header;
