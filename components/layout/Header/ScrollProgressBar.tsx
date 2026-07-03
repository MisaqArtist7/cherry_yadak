'use client'
import React, { useEffect, useState } from 'react'

export default function ScrollProgressBarComponent() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            if ( totalHeight > 0 ) {
                const progress = (window.scrollY / totalHeight) * 100
                setScrollProgress(progress)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
            <div
                className="absolute bottom-0 right-0 h-0.5 bg-(--primaryColor) shadow-[0_0_8px_#D92F4E,0_0_15px_#D92F4E]"
                style={{ width: `${scrollProgress}%` }}
            />
    )
}
