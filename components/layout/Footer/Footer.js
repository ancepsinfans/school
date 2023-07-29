import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      powered by
      <span className={styles.Vercel}>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={72}
          height={16} />
      </span>

    </footer>
  );
}

export default Footer;
