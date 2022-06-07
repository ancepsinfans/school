import React from "react";
import Link from "next/link";
import styles from '../../styles/Home.module.css'
import progressSender from '../../models/progress/helpers'

function NextLessonButton({ link, text, user, sphere, path }) {
  return (
    <Link href={link}>
      <button
        className={styles.Login}
        onClick={() => progressSender(
          user,
          sphere,
          path
        )}
      >{text} &rarr;</button>
    </Link>
  );
}

export default NextLessonButton;
