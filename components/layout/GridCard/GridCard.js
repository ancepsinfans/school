'use client'
import React from "react";
import styles from './GridCard.module.css'
import Link from "next/link";
import { FlexWrapper } from "@/components/wrappers";


const GridCard = ({ link, isAdmin = false, title, description, isRestricted = false, isDisabled = false, onClick, hidden = false, completed = false, lessonDetails }) => {

  const Type = link === '' ? 'button' : Link
  return (
    <div style={{ display: (isRestricted && !isAdmin ? "none" : "block") }}>
      <Type href={link} style={{ background: 'none', border: 'none' }} onClick={onClick}>
        <div className={`${styles.card} ${isDisabled ? styles.disabled : null}`}
          hidden={hidden ? hidden : undefined}
        >
          <FlexWrapper direction="column" alignItems="stretch" minHeight="204px">
            <div style={{ flex: '1' }} >

          <h2>{title}</h2>
          <p className={styles.description}>{description}</p>

            </div>
            <FlexWrapper direction="row" justifyContent="space-between" alignItems="flex-end" style={{ flex: '1' }}>

            {lessonDetails}

            <div>{completed ? "✅" : null}</div>
          </FlexWrapper>
          </FlexWrapper>

        </div>
      </Type>
    </div>
  )
};



export default GridCard;
