'use client'
import Link from 'next/link';
import React from 'react';

function LinkyButton({ children, link }) {
  return (
    <Link href={link} passHref legacyBehavior>
      {children}
    </Link>
  );
}

export default LinkyButton;
