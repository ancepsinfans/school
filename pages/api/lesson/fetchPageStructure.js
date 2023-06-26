import fs from 'fs';
import { join, parse, extname } from 'path';


function generatePageStructure(dir) {

    const files = fs.readdirSync(dir);
    const pages = {};

    for (const file of files) {
        const filePath = join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            pages[file] = generatePageStructure(filePath);
        } else if (stat.isFile()) {
            const fileName = parse(file).name;
            const fileType = extname(file);

            if (fileType === '.mdx') {
                if (!pages.files) {
                    pages.files = [];
                }
                pages.files.push(fileName);
            }
        }
    }
    return pages;
}

export default function handler(req, res) {
    const masterDirectory = join(process.cwd(), '_pages');
    const pageStructure = generatePageStructure(masterDirectory);
    delete pageStructure['.obsidian'];

    res.status(200).json(pageStructure);
}
