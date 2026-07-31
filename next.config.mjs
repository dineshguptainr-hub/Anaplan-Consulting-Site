/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static export — IONOS shared hosting serves files from Apache and has no
  // Node.js runtime, so there is nothing to run server-side. `next build`
  // writes a complete site to out/ which gets uploaded as-is.
  output: "export",

  // Emits out/services/index.html rather than out/services.html, so Apache
  // serves /services/ from the directory index without any rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
