'use client'
import { useState, useRef } from 'react'
import { usePathname } from "next/navigation"
import Link from 'next/link'

interface Category { 
    name: string,
}

export default function MainNavComponent({ categories }: { categories: Category[] }) {
    console.log(categories)
    const [megaOpen, setMegaOpen] = useState(false)
    const timeoutRef = useRef<number | null>(null);
    const pathname = usePathname()

    const openMega = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setMegaOpen(true)
    }
    
    const closeMega = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = window.setTimeout(() => {
            setMegaOpen(false);
        }, 120);
    };   

    const menuItems = [
        { label: 'دسته‌بندی‌ها', icon: '#bars-3-bottom-right', href: '/' },
        { label: 'شگفت‌انگیزها', icon: '#percent-badge', href: '/discounts' },
        { label: 'درباره ما', icon: '#building-storefront', href: '/about-us' },
        { label: 'تماس با ما', icon: '#phone', href: '/contact-us' }
    ]

    const isCategories = (item: { label: string }) => item.label === 'دسته‌بندی‌ها';
    
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

                                {/* مگامنو با یوآی جدید (لیست عمودی) */}
                                {isCat && megaOpen && categories && categories.length > 0 && (
                                    <div className="absolute pt-1 z-50 w-72"> {/* عرض منو را متناسب با یک لیست عمودی تک‌ستونه جمع‌وجور کردیم */}
                                        <div className="bg-white border border-gray-200 shadow-xl rounded-b-2xl p-4 flex flex-col py-3">
                                            
                                            {categories.map((category, idx) => (
                                                <Link 
                                                    key={idx}
                                                    href={`/category/${category.name}`} // مسیر نمونه برای کلیک روی دسته‌بندی
                                                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-(--primaryColor) transition-colors group/item"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {/* یک پین رنگی کوچک سمت راست نام دسته‌بندی */}
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/item:bg-(--primaryColor) transition-colors" />
                                                        <span className=" font-semibold">
                                                            {category.name}
                                                        </span>
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

            {megaOpen && (
                <div className="fixed inset-0 bg-black/30 z-40 pointer-events-none" />
            )}
        </>
    )
}