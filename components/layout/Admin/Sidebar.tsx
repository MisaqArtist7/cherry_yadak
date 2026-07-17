'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";

type SidebarProps = { 
    isOpen: boolean, 
    onClose: () => void; }
// اضافه کردن پراپ‌های کنترل وضعیت منو در موبایل
export default function Sidebar({ isOpen, onClose } : SidebarProps) {
    const pathname = usePathname()

    const menuItems = [
        { label: 'میز کار', icon: '#squares-2x2', href: '/admin' },
        { label: 'مدیریت محصولات', icon: '#building-storefront', href: '/admin/products/manage-products' },
        { label: 'افزودن محصول جدید', icon: '#plus-circle', href: '/admin/products/create-product' },
        { label: 'افزودن دسته‌ب بندی', icon: '#tag', href: '/admin/products/create-category' },
        { label: 'افزودن برند', icon: '#puzzle-piece', href: '/admin/products/create-brand' },
        { label: 'لیست کاربران', icon: '#users', href: '/admin/users' },
    ]
    const router = useRouter();

    const [loggingOut, setLoggingOut] = useState(false);
    async function handleLogout() {
        setLoggingOut(true);
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh(); // برای پاک شدن استیت‌های سرور که به کوکی وابسته‌ن
        } finally {
            setLoggingOut(false);
        }
    }
    return (
        <>
            {/* لایه تاریک پشت سایدبار در موبایل (Backdrop) */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* بدنه اصلی سایدبار با کلاس‌های ریسپانسیو جدید */}
            <aside className={`
                fixed inset-y-0 right-0 z-999 xl:z-50 w-72 bg-white shadow-xl p-6 flex flex-col shrink-0 border-l border-gray-100 transition-transform duration-300 ease-in-out
                lg:static lg:w-80 lg:shadow-sm lg:shadow-gray-200/60 lg:rounded-3xl lg:border lg:translate-x-0
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                
                {/* دکمه بستن سایدبار فقط در موبایل */}
                <button 
                    onClick={onClose}
                    className="lg:hidden absolute left-4 top-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100 mt-6 lg:mt-0">
                    <div className="relative w-24 h-24 rounded-full p-1 border-2 border-(--primaryColor)/20">
                        <Image src='/images/admin.jpg' fill alt="تصویر ادمین" className="object-cover rounded-full" />
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 text-base">میثاق باباخانی</h2>
                        <span className="font-bold text-gray-400 block mt-1">مدیر کل مجموعه</span>
                    </div>
                </div>

                <nav className="mt-6 flex-1 overflow-y-auto">
                    <ul className="flex flex-col gap-2">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.href

                            return (
                                <li key={index}>
                                    <Link 
                                        href={item.href} 
                                        onClick={onClose} // بستن منو بعد از کلیک در موبایل
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 group ${
                                            isActive 
                                            ? 'bg-(--primaryColor) text-white shadow-lg shadow-(--primaryColor)/20' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                        }`}
                                    >
                                        <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-black'}`}>
                                            <use href={item.icon}></use>
                                        </svg>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="text-red-500 hover:text-red-600 disabled:opacity-60"
                    >
                    {loggingOut ? "در حال خروج…" : "خروج از حساب کاربری"}
                </button>
            </aside>
        </>
    )
}