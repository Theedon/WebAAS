/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
