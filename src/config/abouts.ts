export const stats = [
  { value: "3+", label: "Года опыта" },
  { value: "10+", label: "Проектов" },
  { value: "12+", label: "Клиентов" },
]

export type TechIconId =
  | "nextjs"
  | "typescript"
  | "tailwind"
  | "framer"
  | "react"
  | "elixir"
  | "phoenix"
  | "go"
  | "postgresql"
  | "nodejs"
  | "firebase"
  | "supabase"
  | "wordpress"
  | "shopify"
  | "woocommerce"
  | "flutter"
  | "dart"
  | "figma"
  | "photoshop"
  | "analytics"
  | "xcode"
  | "androidstudio"
  | "searchconsole"

export type TechItem = {
  id: TechIconId
  name: string
  color: string
}

export type TechGroup = {
  category: string
  items: TechItem[]
}

export const techStack: TechGroup[] = [
  {
    category: "Frontend",
    items: [
      { id: "nextjs", name: "Next.js", color: "#FFFFFF" },
      { id: "typescript", name: "TypeScript", color: "#3178C6" },
      { id: "tailwind", name: "Tailwind CSS", color: "#06B6D4" },
      { id: "framer", name: "Framer Motion", color: "#0055FF" },
      { id: "react", name: "React", color: "#61DAFB" },
    ],
  },
  {
    category: "Backend",
    items: [
      { id: "elixir", name: "Elixir", color: "#4B275F" },
      { id: "phoenix", name: "Phoenix", color: "#FD4F00" },
      { id: "go", name: "GO", color: "#00ADD8" },
      { id: "postgresql", name: "PostgreSQL", color: "#4169E1" },
      { id: "nodejs", name: "Node.js", color: "#5FA04E" },
      { id: "firebase", name: "Firebase", color: "#DD2C00" },
      { id: "supabase", name: "Supabase", color: "#3FCF8E" },
    ],
  },
  {
    category: "Platforms",
    items: [
      { id: "wordpress", name: "WordPress", color: "#21759B" },
      { id: "shopify", name: "Shopify", color: "#7AB55C" },
      { id: "woocommerce", name: "WooCommerce", color: "#96588A" },
    ],
  },
  {
    category: "Mobile",
    items: [
      { id: "flutter", name: "Flutter", color: "#02569B" },
      { id: "dart", name: "Dart", color: "#0175C2" },
    ],
  },
  {
    category: "Tools",
    items: [
      { id: "figma", name: "Figma", color: "#F24E1E" },
      { id: "photoshop", name: "Photoshop", color: "#31A8FF" },
      { id: "analytics", name: "Analytics", color: "#E37400" },
      { id: "xcode", name: "Xcode", color: "#147EFB" },
      { id: "androidstudio", name: "Android Studio", color: "#3DDC84" },
      { id: "searchconsole", name: "Search Console", color: "#458CF5" },
    ],
  },
]

export const techNames = techStack.flatMap((group) => group.items.map((item) => item.name))

export function techNamesByCategory(category: string): string[] {
  return techStack.find((group) => group.category === category)?.items.map((item) => item.name) ?? []
}
