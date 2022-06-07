import React from "react";
import Link from "next/link";
import styles from '../../styles/Home.module.css'

function NextLessonButton({ link, text, alert }) {
  return (
    <Link href={link}>
      <button className={styles.Login}>{text} &rarr;</button>
    </Link>
  );
}

export default NextLessonButton;
