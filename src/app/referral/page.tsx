import type { Metadata } from "next"
import {
  ReferralConditions,
  ReferralHero,
} from "@/components/referral/ReferralSections"
import FAQ from "@/components/services/FAQ"
import Contact from "@/components/sections/Contact"
import JsonLd from "@/components/seo/JsonLd"
import { referralFaq } from "@/config/referral"
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  createPageMetadata,
} from "@/config/seo"

export const metadata: Metadata = createPageMetadata("referral")

export default function ReferralPage() {
  return (
    <>
      <JsonLd
        data={[
          buildFaqJsonLd(referralFaq),
          buildBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Реферальная программа", path: "/referral" },
          ]),
        ]}
      />
      <ReferralHero />
      <ReferralConditions />
      <FAQ title="Частые вопросы" items={referralFaq} id="referral-faq" />
      <Contact />
    </>
  )
}
