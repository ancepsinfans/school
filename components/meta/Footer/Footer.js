'use client'
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const FooterStyled = styled.footer`
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

function Footer() {
  return (
    <FooterStyled>
      powered by
      <span style={{
        height: '1em',
        marginLeft: '0.5rem'
      }}>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={72}
          height={16} />
      </span>

    </FooterStyled>
  );
}

export default Footer;
