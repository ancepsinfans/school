import fs from 'fs'
import { join } from 'path'

const masterDirectory = join(process.cwd(), '_pages')

export function getAllLessons(fields = []) {
    const spheres = fs.readdirSync(masterDirectory)
    const lib = {}
    spheres.forEach(f => {
        lib[f] = {}
        let courses = fs.readdirSync(join(masterDirectory.toString(), f))
        courses.forEach(g => {
            lib[f][g] = []
            let lessons = fs.readdirSync(join(masterDirectory.toString(), f, g))
            lessons.forEach(h => {
                lib[f][g].push(h.slice(0, -4))
            })
        })
    })
    return lib

}
