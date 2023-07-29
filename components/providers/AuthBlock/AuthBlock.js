'use client'
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

function AuthBlock({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  // Check if the current page is the homepage
  const isHomepage = pathname === '/';
  const isAbout = pathname === '/about'
  const session = useSession();

  // Check session on every render, except for the homepage
  if (!isHomepage && !isAbout) {
    if (session.status === 'unauthenticated') {
      // If the user is not authenticated, redirect to the login page
      router.replace('/login');
      return null;
    }
  }

  return <>{children}</>;
}

export default AuthBlock;

