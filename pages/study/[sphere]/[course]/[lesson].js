import React from "react";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from "next-mdx-remote";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { Loading, MainContainer } from "../../../../components/meta";
import { Popover, MCQuiz, TextInputQuiz, MCorOther } from "../../../../components/atomic";
import { fetchDBStructure, fetchLessonPage, fetchQuestions, getAnyName, getLessonName } from "../../../../middleware";
import Link from "next/link";


const Content = styled.div`
 & {
     margin: 15px 40px;
 }
   @media (max-width: 768px) {
    margin: 15px -15px;
  }

 & ul, ol {
     list-style-position: inside;
     padding: 10px 0 10px 20px;
 }

 & em {
     text-decoration: underline 4px var(--accentPurple70);
     font-style: normal;
 }
`

const LessonPage = (
    {
        source,
        sphere,
        course,
        lesson,
        qs,
        user,
        broken,
        nextPage
    }
) => {
    const { status } = useSession()

    const components = {
        MCQ: MCQuiz,
        TextI: TextInputQuiz,
        Def: Popover,
        Feed: MCorOther,
        a: Link,
    }

    if (status === 'loading' | broken) {
        return (
            <Loading />
        )
    }

    return (
        <MainContainer
            smallTitle={true}
            titleText={source.frontmatter.title}
            introText={source.frontmatter.intro}
            isLesson={true}

            nextPage={nextPage}
            location={{ sphere, course, lesson }}
        >
            <Content>
                <MDXRemote
                    {...source}
                    scope={{
                        path: [sphere, course, lesson],
                        sphere: sphere,
                        course: course,
                        lesson: lesson,
                        user: user,
                        qs: qs
                    }}
                    components={components}
                />
            </Content>
        </MainContainer>
    )
}


export const getServerSideProps = async (ctx) => {
    if (!ctx.query.ID) {
        return { props: { broken: true } }
    }
    const db = await fetchDBStructure({ sphere: ctx.params.sphere, course: ctx.params.course })
    const thisLesson = getAnyName(db, { sphere: ctx.params.sphere, course: ctx.params.course, lesson: ctx.params.lesson }, 3)
    try {

        const mdxSource = await serialize(thisLesson.text, { parseFrontmatter: true })
        const qs = await fetchQuestions({ sphere: ctx.params.sphere, course: ctx.params.course, lesson: ctx.params.lesson })

        const nextLessonName = mdxSource.frontmatter.next !== "" ? getLessonName(db, { sphere: ctx.params.sphere, course: ctx.params.course, lesson: mdxSource.frontmatter.next }, undefined, 'lesson') : "Complete!"

        const link = mdxSource.frontmatter.next !== "" ? `/${ctx.params.sphere}/${ctx.params.course}/${mdxSource.frontmatter.next}?ID=${ctx.query.ID}` : `/${ctx.params.sphere}/${ctx.params.course}?ID=${ctx.query.ID}`

        const nextPage = { name: nextLessonName, link: link }

        return {
            props: {
                user: ctx.query.ID,
                source: mdxSource,
                sphere: ctx.params.sphere,
                course: ctx.params.course,
                lesson: ctx.params.lesson,
                qs: qs,
                nextPage: nextPage
            }
        }

    } catch (error) {
        console.log(error)
        return {
            props: {

                broken: true
            }
        }
    }
}


export default LessonPage
