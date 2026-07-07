'use client'
import { useState, useRef } from 'react'
import { usePathname } from "next/navigation"
import Link from 'next/link'

export default function MainNavComponent() {
    const [megaOpen, setMegaOpen] = useState(false)
    const timeoutRef = useRef(null)
    const pathname = usePathname()

    const openMega = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setMegaOpen(true)
    }
    
    const closeMega = () => {
        timeoutRef.current = setTimeout(() => {
            setMegaOpen(false)
        }, 120)
    }   

    const menuItems = [
        { label: 'دسته‌بندی‌ها', icon: '#bars-3-bottom-right', href: '/' },
        { label: 'شگفت‌انگیزها', icon: '#percent-badge', href: '/discounts' },
        { label: 'درباره ما', icon: '#building-storefront', href: '/about-us' },
        { label: 'تماس با ما', icon: '#phone', href: '/contact-us' }
    ]

    const isCategories = (item) => item.label === 'دسته‌بندی‌ها'
    return (
        <>
            <nav className="border-t border-gray-200 pt-3 relative">
                <ul className="flex items-center gap-6 text-gray-600 font-medium">

                    {menuItems.map((item, index) => {

                        const active = pathname === item.href
                        const isCat = isCategories(item)

                        return (
                            <li
                                key={index}
                                className="group pb-3 -mb-3"
                                onMouseEnter={() => isCat && openMega()}
                                onMouseLeave={() => isCat && closeMega()}
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-2 py-4 relative transition-all ${
                                        active ? 'text-(--primaryColor) font-bold' : 'hover:text-(--primaryColor)'
                                    }`}
                                >
                                    <svg className={`w-5 h-5 ${
                                        active ? 'text-(--primaryColor)' : 'text-gray-400 group-hover:text-(--primaryColor)'
                                    }`}>
                                        <use href={item.icon}></use>
                                    </svg>

                                    <span>{item.label}</span>

                                    <span className={`absolute bottom-3 right-0 h-0.5 bg-(--primaryColor) transition-all duration-300 ${
                                        active ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                                </Link>

                                {/* مگامنو */}
                                {isCat && megaOpen && (
                                    <div className="absolute pt-1 z-50 w-2xl">
                                        <div className="bg-white border border-gray-200 shadow-xl rounded-b-2xl p-6 flex items-center gap-11">

                                            <div>
                                                <h4 className="font-bold mb-3 border-r-2 border-(--primaryColor) pr-2">
                                                    دوربین
                                                </h4>
                                                <ul className="space-y-2 text-gray-500 pr-2">
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">DSLR</li>
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">Mirrorless</li>
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">Compact</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-bold mb-3 border-r-2 border-(--primaryColor) pr-2">
                                                    لنز
                                                </h4>
                                                <ul className="space-y-2 text-gray-500 pr-2">
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">Prime</li>
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">Zoom</li>
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">Macro</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-bold mb-3 border-r-2 border-(--primaryColor) pr-2">
                                                    تجهیزات
                                                </h4>
                                                <ul className="space-y-2 text-gray-500 pr-2">
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">سه‌پایه</li>
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">کیف</li>
                                                    <li className="hover:text-(--primaryColor) cursor-pointer">کارت حافظه</li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {megaOpen && (
                <div className="fixed inset-0 bg-black/30 z-40 pointer-events-none" />
            )}
        </>
    )
}
