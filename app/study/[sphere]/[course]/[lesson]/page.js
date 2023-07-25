
import React from "react";
import { serialize } from 'next-mdx-remote/serialize';
import { getAnyName, fetchDBStructure, fetchQuestions } from "../../../../../middleware";
import styles from './Lesson.module.css'
import Link from "next/link";
import { Popover, MCQuiz, MCorOther, TextInputQuiz, MarkdownDisplay, NextLessonButton } from "../../../../../components/atomic";
import { Intro, Title } from '../../../../../components/layout'



export default async function SpherePage({ params, searchParams }) {

    const db = await fetchDBStructure({ sphere: params.sphere, course: params.course })
    const thisLesson = getAnyName(db, { sphere: params.sphere, course: params.course, lesson: params.lesson }, 3)

    const source = await serialize(thisLesson.text, { parseFrontmatter: true })

    const nextLesson = getAnyName(db, { sphere: params.sphere, course: params.course, lesson: source.frontmatter.next }, 3)

    const qs = await fetchQuestions({ sphere: params.sphere, course: params.course, lesson: params.lesson })
    const nextLessonName = source.frontmatter.next !== "" ? nextLesson.lesson : "Complete!"

    const link = source.frontmatter.next !== "" ? `/${params.sphere}/${params.course}/${source.frontmatter.next}?ID=${searchParams.ID}` : `/${params.sphere}/${params.course}?ID=${searchParams.ID}`

    const nextPage = { name: nextLessonName, link: link }

    const components = {
        MCQ: MCQuiz,
        TextI: TextInputQuiz,
        Def: Popover,
        Feed: MCorOther,
        a: Link,
    }
    return (


        <>

            <Title smallTitle>
                {source.frontmatter.title}
            </Title>
            <Intro>
                {source.frontmatter.intro}
            </Intro>
            <div className={styles.content}>
                <MarkdownDisplay
                    params={params}
                    searchParams={searchParams}
                    qs={qs}
                    source={source}
                    components={components}
                />
            </div>
            <NextLessonButton
                link={"/study" + nextPage.link}
                text={nextPage.name}
                user={searchParams.ID}
                location={{ sphere: params.sphere, course: params.course, lesson: params.lesson }} />
        </>
    )
}
