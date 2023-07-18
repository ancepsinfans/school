'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function AuthBlock({ children }) {
  const router = useRouter()
  const { asPath } = router;

  // Check if the current page is the homepage
  const isHomepage = asPath === '/';
  const isAbout = asPath === '/about'
  const session = useSession();


  // Check session on every render, except for the homepage
  if (!isHomepage && !isAbout) {
    if (session.status === 'unauthenticated') {
      // If the user is not authenticated, redirect to the login page
      router.replace('/');
      return null;
    }
  }

  return <>{children}</>;
}

export default AuthBlock;

