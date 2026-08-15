"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type RevealProps = {
    children: ReactNode
    delay?: number
    className?: string
    y?: number
    onMount?: boolean
}

const ease = [0.21, 0.47, 0.32, 0.98] as const

export function Reveal({
    children,
    delay = 0,
    className,
    y = 32,
    onMount = false,
}: RevealProps) {
    if (onMount) {
        return (
            <motion.div
                initial={{ opacity: 0, y }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay, ease }}
                className={className}
            >
                {children}
            </motion.div>
        )
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
                hidden: { opacity: 0, y },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay, ease },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
