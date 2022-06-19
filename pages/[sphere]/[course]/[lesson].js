import React from "react";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from "next-mdx-remote";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { MainContainer } from "../../../components/infrastructureComponents";
import { MCQuiz, TextInput, MCorOther, Definition } from "../../../components/lessonComponents";
import { getLessonPage } from "../../../lib/fetchLesson";
import connectMongo from '../../../middleware/connectMongo'
import Question from '../../../models/questions/Questions'
import styled from "@emotion/styled";

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

const Test = ({ source, sphere, course, lesson, qs, user }) => {
    console.log(qs)
    const components = {
        MCQ: MCQuiz,
        TextI: TextInput,
        Def: Definition,
        Feed: MCorOther,
    }
    return (
        <MainContainer
            smallTitle={true}
            titleText={source.frontmatter.title}
            introText={source.frontmatter.intro}
            isLesson={true}
            nextPage={`/${sphere}/${course}/${source.frontmatter.next}`}
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


export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ req, res, params }) => {

        try {
            const lessonContents = await getLessonPage(params.sphere, params.course, params.lesson)


            const mdxSource = await serialize(lessonContents, { parseFrontmatter: true })
            const auth0user = getSession(req, res)
            try {
                await connectMongo()

                const qs = await Question.find({})

                return {
                    props: {
                        user: auth0user,
                        source: mdxSource,
                        params: params,
                        sphere: params.sphere,
                        course: params.course,
                        lesson: params.lesson,
                        qs: JSON.parse(JSON.stringify(qs))
                    }
                }
            } catch (error) {
                console.log(error)
                return {
                    props: {
                        user: auth0user,
                        source: mdxSource,
                        params: params,
                        sphere: params.sphere,
                        course: params.course,
                        lesson: params.lesson,
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
})

export default Test
