'use client'

import Image from "next/image"
import Link from "next/link"

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12" dir="rtl">
            <div className="text-center max-w-xl flex flex-col items-center">
                
                {/* بخش تصویر با افکت انیمیشن ملایم بومی Tailwind */}
                <div className="mb-8 relative w-72 h-72 md:w-96 md:h-96 animate-[pulse_3s_infinite_ease-in-out]">
                    <Image 
                        src="/images/404.svg" 
                        fill
                        alt="صفحه پیدا نشد" 
                        className="object-contain"
                        priority
                    />
                </div>

                {/* متن پیام اصلی */}
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                    صفحه‌ای که دنبال آن بودید پیدا نشد!
                </h1>
                
                {/* متن راهنمای فرعی */}
                <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md leading-7">
                    احتمالاً این صفحه حذف شده یا آدرس آن تغییر کرده است. می‌توانید از دکمه زیر برای بازگشت به دنیای محصولات البرز سی‌ان‌سی استفاده کنید.
                </p>

                {/* دکمه بازگشت با استایل نئونی و مدرن هماهنگ با هدر */}
                <Link 
                    href="/" 
                    className="flex items-center gap-2 bg-[#D92F4E] text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 hover:shadow-[#D92F4E]/30 group cursor-pointer"
                >
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 12H5m7 7l-7-7 7-7" />
                    </svg>
                    <span>بازگشت به صفحه اصلی</span>
                </Link>

            </div>
        </div>
    )
}