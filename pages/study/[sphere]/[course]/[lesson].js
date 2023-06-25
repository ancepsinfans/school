import React from "react";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from "next-mdx-remote";
import styled from "styled-components";
import { getLessonPage } from "../../../../middleware/fetchLesson";
import Question from '../../../../models/questions/Questions'
import { useSession } from "next-auth/react";
import { Loading, MainContainer } from "../../../../components/meta";
import { Popover, MCQuiz, TextInput, MCorOther } from "../../../../components/atomic";


const Content = styled.div`
 & {
     margin: 15px 0;
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
        broken
    }
) => {
    const { status } = useSession()

    const components = {
        MCQ: MCQuiz,
        TextI: TextInput,
        Def: Popover,
        Feed: MCorOther,
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
            nextPage={`/${sphere}/${course}/${source.frontmatter.next}?ID=${user}`}
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

    try {
        const lessonContents = await getLessonPage(ctx.params.sphere, ctx.params.course, ctx.params.lesson)
        const mdxSource = await serialize(lessonContents, { parseFrontmatter: true })
        const qs = await Question.find({})
        return {
            props: {
                user: ctx.query.ID,
                source: mdxSource,
                sphere: ctx.params.sphere,
                course: ctx.params.course,
                lesson: ctx.params.lesson,
                qs: JSON.parse(JSON.stringify(qs))
            }
        }

    } catch (error) {
        error.log(error)
        return {
            broken: true
        }
    }
}


export default LessonPage
