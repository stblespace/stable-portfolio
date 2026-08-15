import type { Metadata } from "next"
import { Hero } from "@/components/home/Hero"
import About from "@/components/home/About"
import Contact from "@/components/sections/Contact"
import Projects from "@/components/home/Projects"
import Services from "@/components/home/Services"
import JsonLd from "@/components/seo/JsonLd"
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
} from "@/config/seo"

export const metadata: Metadata = createPageMetadata("home")

export default function Home() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([{ name: "Главная", path: "/" }])}
      />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
    </>
  )
}
