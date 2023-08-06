
import React from "react";
import { serialize } from 'next-mdx-remote/serialize';
import { getAnyName, fetchDBStructure, fetchQuestions } from "@/middleware";
import styles from './Lesson.module.css'
import Link from "next/link";
import { Popover, MCQuiz, MCorOther, TextInputQuiz, MarkdownDisplay, NextLessonButton } from "@/components/atomic";
import { Intro, Title } from '@/components/layout'
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";



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
    return temp[0][0]

}

export default async function SpherePage({ params }) {



    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.BASE_URL}/api/user/user?email=${session.user.email}`);
    const ID = await response.json();
    const db = await fetchDBStructure({ sphere: params.sphere, course: params.course })

    const thisLesson = getAnyName(db, { sphere: params.sphere, course: params.course, lesson: params.lesson }, 3)

    const source = await serialize(thisLesson.text, { parseFrontmatter: true })

    const nextLesson = getAnyName(db, { sphere: params.sphere, course: params.course, lesson: source.frontmatter.next }, 3)

    const qs = await fetchQuestions({ sphere: params.sphere, course: params.course, lesson: params.lesson })
    const nextLessonName = source.frontmatter.next !== "" ? nextLesson.lesson : "Complete!"

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
                    ID={ID}
                    qs={qs}
                    source={source}
                    components={components}
                />
            </div>
            <NextLessonButton
                link={"/study" + nextPage.link}
                text={nextPage.name}
                user={ID}
            />
        </>
    )
}
