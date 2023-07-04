/** @type {import('next').NextConfig} */
// Added the domain.

const nextConfig = {
    images: {
        domains: ["cloud.appwrite.io","links.papareact.com"],
    },
};

module.exports = nextConfig;
