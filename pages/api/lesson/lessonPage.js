import fs from 'fs';
import { join } from 'path';


export default function handler(req, res) {
    const masterDirectory = join(process.cwd(), '_pages');
    const { sphere, course, lesson } = req.query;

    const fileContents = fs.readFileSync(join(masterDirectory, sphere, course, lesson + '.mdx'), 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ content: fileContents });
}
