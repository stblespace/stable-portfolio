"use client"

import { TechIconButton } from "@/components/ui/TechIcon"
import { techStack } from "@/config/abouts"

export default function TechStack() {
  return (
    <div className="rounded-2xl bg-neutral-900 p-5 sm:p-6 md:p-8 lg:p-10 xxl:p-12! 3xl:p-14!">
      <h3 className="text-white font-semibold text-xl sm:text-2xl md:text-3xl xxl:text-4xl! mb-6 sm:mb-8 xxl:mb-10!">
        Технологии
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-10 xxl:gap-x-14! gap-y-7 sm:gap-y-9 lg:gap-y-10 xxl:gap-y-12!">
        {techStack.map((group) => (
          <div key={group.category} className="min-w-0">
            <p className="text-sm xxl:text-base! text-gray-500 mb-3 sm:mb-4 font-montserrat">
              {group.category}
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 xxl:gap-3!">
              {group.items.map((item) => (
                <TechIconButton key={`${group.category}-${item.id}-${item.name}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
