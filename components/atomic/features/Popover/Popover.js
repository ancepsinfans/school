'use client'
import React from "react";
import * as Pop from '@radix-ui/react-popover'
import vocabSender from "@/models/users/vocabHelper";
import styles from './Popover.module.css'
import { FlexWrapper } from "@/components/wrappers";


const Popover = ({ content, user, location, children }) => {

  const isVocab = !!user ? true : false

  return (
    <Pop.Root>
      <Pop.Trigger className={isVocab ? styles.VocabChild : styles.PopChild}>{children}</Pop.Trigger>
      <Pop.Portal>
        <Pop.Content className={isVocab ? styles.VocabContent : styles.PopContent} >
          <FlexWrapper >

            {content}{' '}
            {isVocab ?
              <>
                <p style={{ width: '5px' }}>{' '}</p>
                <button className={styles.add}
            onClick={() => {
              vocabSender(user, { term: children, definition: content }, location)
            }}
          >
            +
                </button>
              </>
              : null}
          </FlexWrapper>
          <Pop.Arrow className={isVocab ? styles.VocabArrow : styles.PopArrow} />
        </Pop.Content>
      </Pop.Portal>
    </Pop.Root>

  );
};

export default Popover;
