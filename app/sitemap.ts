import type { MetadataRoute } from "next";

const SITE_URL = "https://www.selsdal.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/legal`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
