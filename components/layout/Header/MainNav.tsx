'use client'
import { useState, useRef } from 'react'
import { usePathname } from "next/navigation"
import Link from 'next/link'

interface Category { 
    name: string
    slug: string
}

export default function MainNavComponent({ categories }: { categories: Category[] }) {
    const [megaOpen, setMegaOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileCatsOpen, setMobileCatsOpen] = useState(false)
    const timeoutRef = useRef<number | null>(null)
    const pathname = usePathname()

    // مدیریت مگامنو دسکتاپ
    const openMega = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setMegaOpen(true)
    }
    
    const closeMega = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
            setMegaOpen(false)
        }, 120)
    }   

    const menuItems = [
        { label: 'دسته‌بندی‌ها', icon: '#bars-3-bottom-right', href: '#', isCatTrigger: true },
        { label: 'شگفت‌انگیزها', icon: '#percent-badge', href: '/discounts' },
        { label: 'درباره ما', icon: '#building-storefront', href: '/about-us' },
        { label: 'تماس با ما', icon: '#phone', href: '/contact-us' }
    ]

    return (
        <>
            {/* ----------------- بخش اول: ناوبری دسکتاپ (مخفی در موبایل) ----------------- */}
            <nav className="hidden md:block border-t border-gray-100 pt-1 relative">
                <ul className="flex items-center gap-6 text-gray-600 font-medium">
                    {menuItems.map((item, index) => {
                        const active = pathname === item.href
                        const isCat = item.isCatTrigger

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

                                {/* مگامنوی دسکتاپ */}
                                {isCat && megaOpen && categories && categories.length > 0 && (
                                    <div className="absolute pt-1 z-50 w-72">
                                        <div className="bg-white border border-gray-200 shadow-xl rounded-b-2xl p-4 flex flex-col py-3">
                                            {categories.map((category, idx) => (
                                                <Link 
                                                    key={idx}
                                                    href={`/category/${category.slug}`}
                                                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-(--primaryColor) transition-colors group/item"
                                                    onClick={() => setMegaOpen(false)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/item:bg-(--primaryColor) transition-colors" />
                                                        <span className="font-semibold">{category.name}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* افکت تیره شدن پس‌زمینه دسکتاپ هنگام باز شدن مگامنو */}
            {megaOpen && (
                <div className="hidden md:block fixed inset-0 bg-black/30 z-40 pointer-events-none" />
            )}


            {/* ----------------- بخش دوم: منوی موبایل (مخفی در دسکتاپ) ----------------- */}
            <div className="md:hidden flex items-center justify-between border-t border-gray-100 py-3">
                <button 
                    onClick={() => setMobileMenuOpen(true)}
                    className="flex items-center gap-2 text-gray-700 font-semibold focus:outline-none"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>منوی دسترسی</span>
                </button>
            </div>

            {/* بک‌دراپ (تاریک‌کننده کل صفحه در موبایل هنگام باز شدن منو) */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* کشوی منوی موبایل (Drawer) از سمت راست خارج می‌شود */}
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-white z-60 shadow-2xl transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto flex flex-col ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                
                {/* دکمه بستن منوی موبایل */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="font-bold text-gray-800 text-lg">چری یدک</span>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-1 rounded-full bg-gray-100 text-gray-500 hover:text-black focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* لیست آیتم‌های منوی موبایل */}
                <ul className="flex flex-col gap-2 mt-4 text-gray-700">
                    {menuItems.map((item, index) => {
                        const isCat = item.isCatTrigger

                        if (isCat) {
                            return (
                                <li key={index} className="border-b border-gray-50 pb-2">
                                    <button 
                                        onClick={() => setMobileCatsOpen(!mobileCatsOpen)}
                                        className="flex items-center justify-between w-full py-3 text-right font-semibold text-gray-800 hover:text-(--primaryColor) focus:outline-none"
                                    >
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-gray-400"><use href={item.icon}></use></svg>
                                            <span>{item.label}</span>
                                        </div>
                                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileCatsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* زیرمنوی آکاردئونی دسته‌بندی‌ها در موبایل */}
                                    <div className={`transition-all duration-300 overflow-hidden ${
                                        mobileCatsOpen ? 'max-h-125 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
                                    }`}>
                                        <ul className="mr-6 pr-4 border-r border-gray-100 flex flex-col gap-1.5">
                                            {categories.map((category, idx) => (
                                                <li key={idx}>
                                                    <Link 
                                                        href={`/category/${category.slug}`}
                                                        className="block py-2 text-sm text-gray-600 hover:text-(--primaryColor)"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            )
                        }

                        return (
                            <li key={index} className="border-b border-gray-50 pb-2">
                                <Link 
                                    href={item.href}
                                    className="flex items-center gap-3 py-3 font-semibold text-gray-800 hover:text-(--primaryColor)"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <svg className="w-5 h-5 text-gray-400"><use href={item.icon}></use></svg>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}