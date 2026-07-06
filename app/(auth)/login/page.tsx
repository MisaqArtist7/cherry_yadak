'use client'

import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-12">
            
            {/* کارت اصلی با افکت لبه متحرک ملایم */}
            <div className="relative w-full max-w-lg p-0.5 overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50">
                
                {/* انیمیشن چرخشی دور کارت */}
                <div className="absolute inset-[-1000%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F8FAFC_0%,#FFFFFF_40%,#D92F4E_50%,#FFFFFF_60%,#F8FAFC_100%)]" />

                {/* محتوای داخلی فرم */}
                <div className="relative bg-white p-8 md:p-10 rounded-[22px] z-10 flex flex-col items-center">
                    
                    {/* لوگو */}
                    <Link href='./' className="mb-6">
                        <Image src="/images/logo.svg" width={160} height={50} alt="البرز سی‌ان‌سی" className="h-10 w-auto" />
                    </Link>

                    {/* عناوین */}
                    <div className="w-full text-right mb-6">
                        <h1 className="text-xl font-black text-gray-900 mb-2">ورود به حساب کاربری</h1>
                        <p className="text-sm text-gray-500">خوش آمدید! لطفاً اطلاعات حساب خود را وارد کنید.</p>
                    </div>

                    {/* فرم ورود */}
                    <form method="post" className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
                        
                        {/* شماره موبایل یا ایمیل */}
                        <div className="relative group">
                            <input 
                                type="text" 
                                name="username"
                                required
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-left text-gray-900 font-medium transition-all focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10" 
                                style={{ direction: 'ltr' }}
                            />
                            <label className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 bg-white px-1 pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#D92F4E] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500">
                                شماره موبایل یا ایمیل
                            </label>
                        </div>

                        {/* رمز عبور */}
                        <div className="relative group">
                            <input 
                                type="password" 
                                name="password"
                                required
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-left text-gray-900 font-medium transition-all focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10" 
                                style={{ direction: 'ltr' }}
                            />
                            <label className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 bg-white px-1 pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#D92F4E] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500">
                                رمز عبور
                            </label>
                        </div>

                        {/* دکمه ورود */}
                        <button 
                            type="submit" 
                            className="w-full bg-[#D92F4E] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 cursor-pointer"
                        >
                            ورود به سایت
                        </button>
                    </form>

                    {/* لینک به صفحه ثبت نام */}
                    <div className="mt-6 text-sm text-gray-500 text-center">
                        حساب کاربری ندارید؟ 
                        <Link href="/register" className="text-[#D92F4E] font-bold mr-1 hover:underline underline-offset-4">
                            ثبت‌نام کنید
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}