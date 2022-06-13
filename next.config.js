/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})


const nextConfig = {
  reactStrictMode: true,
}

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  nextConfig,
  images: {
    domains: [
      's.gravatar.com',
      'www.thispersondoesnotexist.com'
    ],
  },
  env: {
    mongodburl: process.env.MONGODB_URI
  }
})
