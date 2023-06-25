import Link from 'next/link';
import React from 'react';

function LinkyButton({ children, link }) {
  return (

    <Link href={link} passHref>
      {children}
    </Link>

  )
}

export default LinkyButton;
