import fs from 'fs'
import { join } from 'path'

const masterDirectory = join(process.cwd(), '_pages')

export function getLessonPage(sphere, course, lesson) {
    const pathTest = join(masterDirectory, sphere, course, lesson)
    const fileContents = fs.readFileSync(join(pathTest + '.mdx'), 'utf8')

    return fileContents

}
