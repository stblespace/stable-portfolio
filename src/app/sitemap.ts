import type { MetadataRoute } from "next"
import { getSitemapEntries } from "@/config/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries()
}
