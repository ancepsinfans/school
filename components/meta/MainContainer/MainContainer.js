'use client'
import React from "react";
import styled from "styled-components";
import NavBar from "../NavBar";
import { NextLessonButton } from "../../atomic";
import { usePathname } from 'next/navigation'
import styles from './MainContainer.module.css'



function MainContainer({ children }) {



  return (
    <>

      <div className={styles.container}>
        <main className={styles.main} >

          {children}

        </main>
      </div>
    </>
  );
}

export default MainContainer;
