import type { Metadata } from "next"
import ServicesDetailed from "@/components/services/ServicesDetailed"
import FAQ from "@/components/services/FAQ"
import Projects from "@/components/home/Projects"
import Contact from "@/components/sections/Contact"
import JsonLd from "@/components/seo/JsonLd"
import { faqItems } from "@/config/services"
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  createPageMetadata,
} from "@/config/seo"

export const metadata: Metadata = createPageMetadata("services")

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          buildFaqJsonLd(faqItems),
          buildBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Услуги", path: "/services" },
          ]),
        ]}
      />
      <ServicesDetailed />
      <FAQ items={faqItems} />
      <Projects />
      <Contact />
    </>
  )
}
