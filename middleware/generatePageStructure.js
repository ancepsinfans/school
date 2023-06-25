const fs = require('fs');
const path = require('path');

function generatePageStructure(dir) {
    const files = fs.readdirSync(dir);
    const pages = {};

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            pages[file] = generatePageStructure(filePath);
        } else if (stat.isFile()) {
            const fileName = path.parse(file).name;
            const fileType = path.extname(file);

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

const pageStructure = generatePageStructure('./_pages');
delete pageStructure['.obsidian']

export default pageStructure