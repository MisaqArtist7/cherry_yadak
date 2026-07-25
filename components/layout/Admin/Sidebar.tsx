'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type SidebarProps = { 
    isOpen: boolean, 
    onClose: () => void; 
}

export default function Sidebar({ isOpen, onClose } : SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()

    const menuItems = [
        { label: 'میز کار', icon: '#squares-2x2', href: '/admin' },
        { label: 'مدیریت محصولات', icon: '#building-storefront', href: '/admin/products/manage-products' },
        { label: 'افزودن محصول جدید', icon: '#plus-circle', href: '/admin/products/create-product' },
        { label: 'افزودن دسته‌بندی', icon: '#tag', href: '/admin/products/create-category' },
        { label: 'افزودن برند', icon: '#puzzle-piece', href: '/admin/products/create-brand' },
        { label: 'ادیت محصول', icon: '#puzzle-piece', href: '/admin/products/edit-product' },
        { label: 'لیست کاربران', icon: '#users', href: '/admin/users' },
    ]

    const [loggingOut, setLoggingOut] = useState(false);
    async function handleLogout() {
        setLoggingOut(true);
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <>
            {/* لایه تاریک پشت سایدبار در موبایل (Backdrop) */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* بدنه اصلی سایدبار */}
            <aside className={`
                fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl p-6 flex flex-col shrink-0 border-l border-slate-100 transition-transform duration-300 ease-in-out
                lg:static lg:w-80 lg:shadow-sm lg:shadow-slate-200/60 lg:rounded-3xl lg:border lg:translate-x-0
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                
                {/* دکمه بستن سایدبار در موبایل */}
                <button 
                    onClick={onClose}
                    className="lg:hidden absolute left-4 top-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* پروفایل کاربر */}
                <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-slate-100 mt-4 lg:mt-0">
                    <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/30 shadow-md shadow-[#D92F4E]/10">
                        <Image src='/images/admin.jpg' fill alt="تصویر ادمین" className="object-cover rounded-full" />
                    </div>
                    <div>
                        <h2 className="font-black text-slate-900 text-lg md:text-xl">میثاق باباخانی</h2>
                        <span className="font-extrabold text-slate-400 block mt-1 text-sm md:text-base">مدیر کل مجموعه</span>
                    </div>
                </div>

                {/* منوی اصلی */}
                <nav className="mt-6 flex-1 overflow-y-auto pr-1">
                    <ul className="flex flex-col gap-2.5">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.href

                            return (
                                <li key={index}>
                                    <Link 
                                        href={item.href} 
                                        onClick={onClose}
                                        className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl font-extrabold text-base lg:text-lg transition-all duration-200 group ${
                                            isActive 
                                            ? 'bg-[#D92F4E] text-white shadow-lg shadow-[#D92F4E]/25' 
                                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <svg className={`w-6 h-6 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`}>
                                            <use href={item.icon}></use>
                                        </svg>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* دکمه خروج از حساب */}
                <div className="pt-4 mt-2 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl font-black text-base md:text-lg text-rose-600 bg-rose-50/80 hover:bg-rose-100/80 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 cursor-pointer"
                    >
                        <svg className="w-6 h-6 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>{loggingOut ? "در حال خروج…" : "خروج از حساب کاربر"}</span>
                    </button>
                </div>
            </aside>
        </>
    )
}