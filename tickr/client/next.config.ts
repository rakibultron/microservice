module.exports = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/",
    "/auth",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "www.shutterstock.com",
      },
    ],
  },
};
