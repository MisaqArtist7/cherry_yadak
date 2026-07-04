'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname()

    const menuItems = [
        { label: 'میز کار', icon: '#squares-2x2', href: '/admin' },
        { label: 'مدیریت محصولات', icon: '#building-storefront', href: '/admin/products/manage-products' },
        { label: 'افزودن محصول جدید', icon: '#plus-circle', href: '/admin/products/create-product' },
        { label: 'افزودن دسته‌بندی', icon: '#tag', href: '/admin/products/create-category' },
        { label: 'افزودن برند', icon: '#puzzle-piece', href: '/admin/products/create-brand' },
        { label: 'لیست کاربران', icon: '#users', href: '/admin/users' }
    ]

    return (
        <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
            <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                <div className="relative w-24 h-24 rounded-full p-1 border-2 border-(--primaryColor)/20">
                    <Image src='/images/admin.jpg' fill alt="تصویر ادمین" className="object-cover rounded-full" />
                </div>
                <div>
                    <h2 className="font-black text-gray-900 text-base">میثاق باباخانی</h2>
                    <span className="font-bold text-gray-400 block mt-1">مدیر کل مجموعه</span>
                </div>
            </div>

            <nav className="mt-6 flex-1">
                <ul className="flex flex-col gap-2">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href

                        return (
                            <li key={index}>
                                <Link 
                                    href={item.href} 
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
        </aside>
    )
}