import { Header } from "@/components/sections/layout/Header"
import { Hero } from "@/components/home/Hero"
import  About  from "@/components/home/About"
import Contact from "@/components/sections/Contact"
export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <About/>
      <Contact/>
    </>
  )
}