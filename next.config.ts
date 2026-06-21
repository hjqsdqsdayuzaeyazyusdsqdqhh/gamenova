import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https: data: blob:; frame-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; worker-src 'self' blob: https:; connect-src 'self' https: wss: ws:; img-src 'self' https: data: blob:; style-src 'self' 'unsafe-inline' https:; media-src 'self' https: blob:; font-src 'self' https: data:",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/gd/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:; connect-src 'self' blob: data:; img-src 'self' https: data: blob:; style-src 'self' 'unsafe-inline'; media-src 'self' blob:; font-src 'self' data:",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/gd/:uuid/index.html",
        destination: "https://html5.gamedistribution.com/rvvASMiM/:uuid/index.html",
      },
      {
        source: "/api/gd/:uuid/:path*",
        destination: "https://html5.gamedistribution.com/rvvASMiM/:uuid/:path*",
      },
    ];
  },
};

export default nextConfig;
