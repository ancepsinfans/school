export default function slugify(val, num = undefined) {
    if (!!num) {
        return [num, val.toLowerCase().replace(/\s+/g, '-')].join('-')
    }
    return val.toLowerCase().replace(/\s+/g, '-')
}
