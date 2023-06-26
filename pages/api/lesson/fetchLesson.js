import fs from 'fs';
import { join } from 'path';


export default function handler(req, res) {
    const masterDirectory = join(process.cwd(), '_pages');
    console.log(masterDirectory)
    const { sphere, course, lesson } = req.query;

    const pathTest = join(masterDirectory, sphere, course, lesson);
    const fileContents = fs.readFileSync(join(pathTest + '.mdx'), 'utf8');
    console.log({ fileContents })
    res.status(200).json({ content: fileContents });
}
