import React from "react";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from "next-mdx-remote";
import { getLessonPage } from "../../../lib/api";
import MainContainer from "../../../components/MainContainer";
import Question from "../../../models/questions/Questions";
import MC from "../../../components/MC";
import connectMongo from "../../../middleware/connectMongo";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";




const Test = ({ source, params, sphere, course, lesson, qs, user }) => {
    console.log(qs)
    const components = {
        MC: MC
    }
    return (
        <MainContainer
            smallTitle={true}
            titleText={source.frontmatter.title}
            introText={source.frontmatter.intro}
            isLesson={true}
            nextPage={`/${sphere}/${course}/${source.frontmatter.next}`}
        >
            <MDXRemote {...source} scope={{ sphere: sphere, user: user, qs: qs }} components={components} />

        </MainContainer>
    )
}


export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ req, res, params }) => {
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



    }
})

export default Test
