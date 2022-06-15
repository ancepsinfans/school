import { useRouter } from "next/router";
import react from "react";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from "next-mdx-remote";
import { getPostSlugs } from "../../../lib/api";

const Test = ({ routes }) => {
    const router = useRouter()
    const { sphere, course, lesson } = router.query
    console.log(routes)
    return (
        <>
            <p>{routes}</p>
            {/* <MDXRemote {...source} /> */}
            {/* <h1>{sphere}</h1>
            <h2>{course}</h2>
            <h3>{lesson}</h3> */}
        </>
    )
}


// export async function getStaticPaths() {
//     const files = await getPostSlugs()
//     console.log(files)
//     return {
//         paths: [
//             // files?.map((lesson) => ({ params: { lesson } }))
//             '/literature/101/test'
//             // { params: { sphere: sphere, course: course, lesson: lesson } } // See the "paths" section below
//         ],
//         fallback: false
//     };
// }

export async function getServerSideProps({ params, ...props }) {
    const routes = await getPostSlugs()

    return {
        props: {
            routes: routes
        }
    }

    // const source = `_pages/${ctx.sphere}/${ctx.course}/${ctx.lesson}`
    // const mdxSource = await serialize(source)
    // return {
    //     props: {
    //         source: mdxSource,

    //     }
    // }
}

export default Test
