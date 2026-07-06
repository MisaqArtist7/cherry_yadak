// components/layout/Admin/AdminShell.tsx
'use client'

import { useState } from "react"
import Header from "@/components/layout/Admin/Header"
import Sidebar from "@/components/layout/Admin/Sidebar"

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <Header />

            <section className="min-h-screen bg-gray-50/50 flex gap-4 lg:gap-8 p-4 md:p-8">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <div className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full overflow-hidden">
                    {/* دکمه همبرگری موبایل - چون به state نیاز داره اینجا می‌مونه */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden self-end p-3 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm hover:bg-gray-50"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {children}
                </div>
            </section>
        </>
    )
}