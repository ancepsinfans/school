export function deslugify(slug) {
    const parts = slug.split('-');
    let num;
    let text;

    // Check if the first part of the slug is a number
    if (!isNaN(parts[0])) {
        num = parseInt(parts.shift(), 10);
    } else {
        num = undefined;
    }

    text = parts.map(capitalize).join(' ');
    return [text, num];
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
