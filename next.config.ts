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
    ];
  },
};

export default nextConfig;
