/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['s.gravatar.com'],
  },
  env: {
    mongodburl: process.env.MONGODB_URI
  }
}
