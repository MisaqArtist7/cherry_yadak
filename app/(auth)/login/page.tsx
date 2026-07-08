'use client'

import { loginOrRegister } from "./login"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()

    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if (!phone) {
            setError("لطفاً شماره موبایل را وارد کنید")
            return
        }

        setLoading(true)

        try {
            const result = await loginOrRegister(phone)

            if (!result.success) {
                setError(result.message ?? "کاربری با این شماره یافت نشد")
                return
            }

            router.push("/")
            router.refresh()
        } catch (err) {
            setError("مشکلی در ارتباط با سرور پیش آمد")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-12">
            
            <div className="relative w-full max-w-lg p-0.5 overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50">
                
                <div className="absolute inset-[-1000%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F8FAFC_0%,#FFFFFF_40%,#D92F4E_50%,#FFFFFF_60%,#F8FAFC_100%)]" />

                <div className="relative bg-white p-8 md:p-10 rounded-[22px] z-10 flex flex-col items-center">
                    
                    <Link href='./' className="mb-6">
                        <Image src="/images/logo.svg" width={160} height={50} alt="البرز سی‌ان‌سی" className="h-10 w-auto" />
                    </Link>

                    <div className="w-full text-right mb-6">
                        <h1 className="text-xl font-black text-gray-900 mb-2">ورود به حساب کاربری</h1>
                        <p className="text-sm text-gray-500">خوش آمدید! لطفاً شماره موبایل خود را وارد کنید.</p>
                    </div>

                    {error && (
                        <div className="w-full mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-right">
                            {error}
                            {" "}
                            <Link href="/register" className="underline font-bold">
                                ثبت‌نام کنید
                            </Link>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        
                        <div className="relative group">
                            <input 
                                type="tel" 
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-left text-gray-900 font-medium transition-all focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10" 
                                style={{ direction: 'ltr' }}
                            />
                            <label className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 bg-white px-1 pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#D92F4E] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500">
                                شماره موبایل
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#D92F4E] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "در حال ورود..." : "ورود به سایت"}
                        </button>
                    </form>

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