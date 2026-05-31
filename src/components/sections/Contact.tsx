'use client'

import { useState, useEffect } from "react"

const words = ["Стартап", "Лендинг", "Магазин", "Приложение", "Проект"]

export default function Contact() {
  const [currentWord, setCurrentWord] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWord]
    if (!deleting && displayed.length < word.length) {
      setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100)
    } else if (!deleting && displayed.length === word.length) {
      setTimeout(() => setDeleting(true), 1500)
    } else if (deleting && displayed.length > 0) {
      setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setCurrentWord((prev) => (prev + 1) % words.length)
    }
  }, [displayed, deleting, currentWord])


  return (
    <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
            <div className="gradient-border-hover rounded-2xl">
                <div className="bg-neutral-950 rounded-2xl p-12 text-center h-full">
                    <p className="text-gray-400 text-2xl mb-10 font-montserrat">
                        Есть идея? Давайте обсудим её.
                    </p>

                    <h2 className="text-4xl md:text-4xl text-white mb-4 whitespace-nowrap">
                        {" "}
                        <span className="font-press-start text-2xl md:text-4xl">
                            {displayed}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 mt-8">
                        <a href="mailto:stablespace@gmail.com"
                        className="flex items-center gap-2 bg-white text-black font-montserrat px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            Написать Email
                        </a>
                        <a href="https://t.me/stablespace" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-white/20 text-white font-montserrat px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                            Telegram
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-sm font-montserrat">Открыт к новым проектам</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
  
}