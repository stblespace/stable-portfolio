import type { Metadata } from "next"
import ProjectsCatalog from "@/components/projects/ProjectsCatalog"
import JsonLd from "@/components/seo/JsonLd"
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
} from "@/config/seo"

export const metadata: Metadata = createPageMetadata("projects")

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Проекты", path: "/projects" },
        ])}
      />
      <ProjectsCatalog />
    </>
  )
}
