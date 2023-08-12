'use client'
import React from 'react';
import { signIn } from "next-auth/react";
import { GridCard } from '..';

function LoginCard() {
  return (
    <GridCard
      link=''
      onClick={() => signIn()}
      title='Login to get started'
      description='By logging in it allows us to improve your experience'
    />
  );
}

export default LoginCard;
