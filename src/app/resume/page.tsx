import type { Metadata } from "next"
import ResumeHero, {
  ResumeEducation,
  ResumeSkills,
} from "@/components/resume/ResumeSections"
import Projects from "@/components/home/Projects"
import Contact from "@/components/sections/Contact"
import JsonLd from "@/components/seo/JsonLd"
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
} from "@/config/seo"

export const metadata: Metadata = createPageMetadata("resume")

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Резюме", path: "/resume" },
        ])}
      />
      <ResumeHero />
      <ResumeSkills />
      <ResumeEducation />
      <Projects />
      <Contact />
    </>
  )
}
