import React from "react";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from "next-mdx-remote";
import { MainContainer } from "../../../../components/infrastructureComponents";
import { MCQuiz, TextInput, MCorOther, Definition } from "../../../../components/lessonComponents";
import { getLessonPage } from "../../../../lib/fetchLesson";
import connectMongo from '../../../../middleware/connectMongo'
import Question from '../../../../models/questions/Questions'
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";


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
    }
) => {
    const { status } = useSession()

    const components = {
        MCQ: MCQuiz,
        TextI: TextInput,
        Def: Definition,
        Feed: MCorOther,
    }

    if (status === 'loading') {
        return (
            <MainContainer
                navType='other'
                titleText="Loading..."
            >

            </MainContainer>
        )
    }


    return (
        <MainContainer
            smallTitle={true}
            titleText={source.frontmatter.title}
            introText={source.frontmatter.intro}
            isLesson={true}
            nextPage={`/${sphere}/${course}/${source.frontmatter.next}?ID=${user}`}
            sphere={sphere}
            course={course}
            lesson={lesson}
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

    try {
        const lessonContents = await getLessonPage(ctx.params.sphere, ctx.params.course, ctx.params.lesson)


        const mdxSource = await serialize(lessonContents, { parseFrontmatter: true })

        try {
            await connectMongo()

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
            console.log(error)
            return {
                props: {
                    user: ctx.query.ID,
                    source: mdxSource,
                    sphere: ctx.params.sphere,
                    course: ctx.params.course,
                    lesson: ctx.params.lesson,
                    qs: 'none'
                }
            }
        }

    } catch (error) {
        return {

            notFound: true

        }
    }


}


export default LessonPage
