/* @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "a0.muscache.com",
      "pixabay.com",
      "media.rightmove.co.uk",
      "*"
    ],
  },
};

module.exports = nextConfig;
