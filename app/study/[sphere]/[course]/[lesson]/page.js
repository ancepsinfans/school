
import React from "react";
import { serialize } from 'next-mdx-remote/serialize';
import { getAnyName, fetchQuestions, fetchDBStructure } from "@/middleware";
import styles from './Lesson.module.css'
import Link from "next/link";
import { Popover, MCQuiz, MCorOther, TextInputQuiz, MarkdownDisplay, NextLessonButton } from "@/components/atomic";
import { Intro, Title } from '@/components/layout'

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const dbd = await fetchDBStructure({})
    const temp = dbd.map(
        sphere => {
            return sphere.courses.map(course => {

                return course.lessons.map(lesson => {
                    return {
                        sphere: sphere.slug,
                        course: course.slug,
                        lesson: lesson.slug
                    }
                })
            })
        }
    )
    console.log(temp[0][0])
    return temp[0][0]
    // return [
    //     { sphere: 'esl', course: 'short-fiction', lesson: '01-introduction' },
    //     { sphere: 'esl', course: 'short-fiction', lesson: '02-the-enormous-radio' },
    //     { sphere: 'esl', course: 'short-fiction', lesson: '03-roy-spivey' },
    //     { sphere: 'esl', course: 'short-fiction', lesson: '04-the-school' },
    //     { sphere: 'esl', course: 'short-fiction', lesson: '05-leg' }
    // ]

}

export async function generateMetadata({ params }) {
    const db = await fetchDBStructure({})
    const currentDB = getAnyName(db, params, 3)

    return {
        title: `${currentDB.lesson}`
    }
}

export default async function SpherePage({ params }) {

    const fullDB = await fetchDBStructure({})
    const thisLesson = getAnyName(fullDB, params, 3, false, 'text')

    const source = await serialize(thisLesson, { parseFrontmatter: true })


    const qs = await fetchQuestions({ sphere: params.sphere, course: params.course, lesson: params.lesson })

    const nextLessonName = source.frontmatter.next !== ""
        ? getAnyName(fullDB, { sphere: params.sphere, course: params.course, lesson: source.frontmatter.next }, 3, false, 'lesson')
        : "Complete!"

    const link = source.frontmatter.next !== "" ? `/${params.sphere}/${params.course}/${source.frontmatter.next}` : `/${params.sphere}/${params.course}`

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
                    qs={qs}
                    source={source}
                    components={components}
                />
            </div>
            <NextLessonButton
                link={"/study" + nextPage.link}
                text={nextPage.name}
            />
        </>
    )
}
