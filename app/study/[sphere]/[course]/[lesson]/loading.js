import React from "react";
import { Title, Intro } from "@/components/layout";
import { deslugify } from "@/middleware/deslugify";
import styles from './Lesson.module.css'
import { MarkdownDisplay, NextLessonButton } from "@/components/atomic";

export default function LessonLoading({ params }) {
    return (

        <>
            <Title smallTitle>
                {deslugify(params.lesson)}
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
                link={"/"}
                text='Next'
            />
        </>
    )
}