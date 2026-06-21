import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https:; frame-src 'self' https://html5.gamedistribution.com https://html5.gamemonetize.com https://*.gamedistribution.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://html5.gamedistribution.com https://*.gamedistribution.com https://*.gamemonetize.com; worker-src 'self' blob: https://html5.gamedistribution.com; connect-src 'self' https://html5.api.gamedistribution.com https://game.api.gamedistribution.com https://pm.gamedistribution.com https://img.gamedistribution.com https://*.gamedistribution.com https:; img-src 'self' https: data: blob:; style-src 'self' 'unsafe-inline' https:; media-src 'self' https: blob:;",
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
