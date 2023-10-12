/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
    serverMinification: false,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
