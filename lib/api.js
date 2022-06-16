import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const masterDirectory = join(process.cwd(), '_pages')

export function getLessonPage(sphere, course, lesson, fields = []) {
    const pathTest = join(masterDirectory, sphere, course, lesson)
    const fileContents = fs.readFileSync(join(pathTest + '.mdx'), 'utf8')
    const { data, content } = matter(fileContents)
    const items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }

        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })

    return fileContents

}
