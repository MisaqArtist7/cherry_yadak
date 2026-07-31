    'use client'
    import { useState, useRef } from 'react'
    import { usePathname } from 'next/navigation'
    import Link from 'next/link'

    interface Category {
    id: string | number
    name: string
    slug: string
    children?: Category[]
    }

    export default function MainNavComponent({ categories }: { categories: Category[] }) {
    const [megaOpen, setMegaOpen] = useState(false)
    const [activeParentId, setActiveParentId] = useState<string | number | null>(
        categories && categories.length > 0 ? categories[0].id : null
    )
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

    // دسته‌بندی فعال برای نمایش زیردسته‌های دسکتاپ
    const activeCategory = categories?.find(
        (cat) => cat.id === (activeParentId ?? categories[0]?.id)
    )

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
                    <svg
                        className={`w-5 h-5 ${
                        active ? 'text-(--primaryColor)' : 'text-gray-400 group-hover:text-(--primaryColor)'
                        }`}
                    >
                        <use href={item.icon}></use>
                    </svg>
                    <span>{item.label}</span>
                    <span
                        className={`absolute bottom-3 right-0 h-0.5 bg-(--primaryColor) transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                    </Link>

                    {/* مگامنوی دسکتاپ (ساختار دو ستونه استاندارد بدون مشکل Clip زیرمنو) */}
                    {isCat && megaOpen && categories && categories.length > 0 && (
                    <div className="absolute top-full right-0 pt-1 z-50 flex">
                        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl flex w-[580px] h-[380px] overflow-hidden">
                        
                        {/* ستون راست: دسته‌های اصلی (دارای اسکرول عمودی مجزا) */}
                        <div className="w-60 bg-gray-50 border-l border-gray-100 p-2 overflow-y-auto">
                            {categories.map((category) => {
                            const isActive = (activeParentId ?? categories[0]?.id) === category.id
                            return (
                                <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                onMouseEnter={() => setActiveParentId(category.id)}
                                onClick={() => setMegaOpen(false)}
                                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all  font-medium ${
                                    isActive
                                    ? 'bg-white text-(--primaryColor) font-bold shadow-xs'
                                    : 'text-gray-700 hover:bg-gray-100/70'
                                }`}
                                >
                                <span>{category.name}</span>
                                {category.children && category.children.length > 0 && (
                                    <span className=" text-slate-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>
                                    </span>
                                )}
                                </Link>
                            )
                            })}
                        </div>

                        {/* ستون چپ: زیردسته‌ها (دارای اسکرول عمودی مجزا) */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {activeCategory && activeCategory.children && activeCategory.children.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {activeCategory.children.map((child) => (
                                <Link
                                    key={child.id}
                                    href={`/category/${child.slug}`}
                                    onClick={() => setMegaOpen(false)}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-(--primaryColor) transition-colors "
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-(--primaryColor)" />
                                    <span>{child.name}</span>
                                </Link>
                                ))}
                            </div>
                            ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 ">
                                زیردسته‌ای برای این بخش ثبت نشده است
                            </div>
                            )}
                        </div>

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

        {/* بک‌دراپ موبایل */}
        {mobileMenuOpen && (
            <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            />
        )}

        {/* کشوی منوی موبایل (Drawer) */}
        <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-white z-60 shadow-2xl transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
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
                        <svg className="w-5 h-5 text-gray-400">
                            <use href={item.icon}></use>
                        </svg>
                        <span>{item.label}</span>
                        </div>
                        <svg
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            mobileCatsOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* زیرمنوی آکاردئونی دسته‌بندی‌ها در موبایل */}
                    <div
                        className={`transition-all duration-300 overflow-hidden ${
                        mobileCatsOpen ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
                        }`}
                    >
                        <ul className="mr-4 pr-3 border-r-2 border-gray-100 flex flex-col gap-1 max-h-64 overflow-y-auto">
                        {categories.map((category, idx) => (
                            <li key={category.id || idx}>
                            <Link
                                href={`/category/${category.slug}`}
                                className="block py-2  text-gray-600 hover:text-(--primaryColor) transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {category.name}
                            </Link>

                            {category.children && category.children.length > 0 && (
                                <ul className="mr-3 my-1 flex flex-col gap-1  text-gray-500 border-r border-gray-100 pr-2">
                                {category.children.map((child) => (
                                    <li key={child.id}>
                                    <Link
                                        href={`/category/${child.slug}`}
                                        className="block py-1 hover:text-(--primaryColor)"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {child.name}
                                    </Link>
                                    </li>
                                ))}
                                </ul>
                            )}
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
                    <svg className="w-5 h-5 text-gray-400">
                        <use href={item.icon}></use>
                    </svg>
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