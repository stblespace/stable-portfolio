import type { Metadata } from "next"
import ContactPageContent from "@/components/contact/ContactPageContent"
import JsonLd from "@/components/seo/JsonLd"
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
} from "@/config/seo"

export const metadata: Metadata = createPageMetadata("contact")

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Контакты", path: "/contact" },
        ])}
      />
      <ContactPageContent />
    </>
  )
}
