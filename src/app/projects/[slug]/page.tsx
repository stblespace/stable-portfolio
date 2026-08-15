import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProjectDetail from "@/components/projects/ProjectDetail"
import JsonLd from "@/components/seo/JsonLd"
import { getAllProjectSlugs, getProjectBySlug } from "@/config/projects"
import {
  buildBreadcrumbJsonLd,
  buildProjectJsonLd,
  createProjectMetadata,
} from "@/config/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) {
    return {
      title: "Проект не найден",
      robots: { index: false, follow: false },
    }
  }

  return createProjectMetadata(project)
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <>
      <JsonLd
        data={[
          buildProjectJsonLd(project),
          buildBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Проекты", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectDetail project={project} />
    </>
  )
}
