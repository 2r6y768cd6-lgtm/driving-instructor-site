import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  "https://www.googletagmanager.com",
  "https://mc.yandex.ru",
  ...(isDevelopment ? ["'unsafe-eval'"] : []),
];

const connectSources = [
  "'self'",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.googletagmanager.com",
  "https://mc.yandex.ru",
  "wss://mc.yandex.ru",
  "https://mc.webvisor.com",
  "https://mc.webvisor.org",
  "wss://mc.webvisor.com",
  "wss://mc.webvisor.org",
  ...(isDevelopment
    ? ["ws://localhost:*", "ws://127.0.0.1:*", "ws://0.0.0.0:*"]
    : []),
];

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src ${scriptSources.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://mc.yandex.ru",
  "font-src 'self' data:",
  `connect-src ${connectSources.join(" ")}`,
  "media-src 'self'",
  "child-src 'self' blob: https://mc.yandex.ru",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-src blob: https://mc.yandex.ru",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
