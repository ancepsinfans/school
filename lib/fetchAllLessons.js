import { join } from 'path'

const masterDirectory = join(process.cwd(), '_pages')

export function getAllLessons(fs, asObject = true) {
    if (!asObject) {
        const spheres = fs.readdirSync(masterDirectory)
        spheres.splice(spheres.indexOf('.obsidian'), 1)
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
    } else {
        const spheres = fs.readdirSync(masterDirectory)
        spheres.splice(spheres.indexOf('.obsidian'), 1)
        const lib = {}
        spheres.forEach(f => {
            lib[f] = {}
            let courses = fs.readdirSync(join(masterDirectory.toString(), f))
            courses.forEach(g => {
                lib[f][g] = {}
                let lessons = fs.readdirSync(join(masterDirectory.toString(), f, g))
                lessons.forEach(h => {
                    lib[f][g][h.slice(0, -4)] = 0
                })
            })
        })
        return lib
    }
}
