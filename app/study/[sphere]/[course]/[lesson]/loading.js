import React from "react";
import { Title, Intro } from "@/components/layout";
import styles from './Lesson.module.css'
import { MarkdownDisplay, NextLessonButton } from "@/components/atomic";

export default function LessonLoading() {
    return (

        <>
            <Title smallTitle>
                Title goes here
            </Title>
            <Intro>
                alskdfoiafe
            </Intro>
            <div className={styles.content}>
                <MarkdownDisplay
                    isPlaceholder
                />
            </div>
            <NextLessonButton
                link="/"
                text='Next'
            />
        </>
    )
}