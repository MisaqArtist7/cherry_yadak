import Sidebar from "@/components/layout/Admin/Sidebar"
import Header from "@/components/layout/Admin/Header"

import Image from "next/image"
import Link from "next/link"
import prisma from "@/lib/prisma"

export default async function AdminPage() {
    const data = await prisma.product.findMany()
    const category = await prisma.categories.findMany()

    return (
        <>
        {/* هدر بالا (کاملاً هماهنگ با تم) */}
        <Header />

            <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-semibold" dir="rtl">         
                
                {/* سایدبار ادمین */}
                <Sidebar />
            
                {/* بخش فرم اصلی دسته‌بندی */}
                <div className="flex-1 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-8 border border-gray-100">
                    <div className="mb-8 pb-4 border-b border-gray-50 flex justify-between items-center">
                        <h1 className="text-xl font-black text-gray-900">میز کار ادمین</h1>
                        <span className="font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md">خوش آمدید میثاق عزیز</span>
                    </div>
                    
                    <div className="max-w-4xl mx-auto space-y-8">
                        
                        {/* بخش اول: باکس‌های آمار سریع */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: "کل محصولات", value: `${data.length}`, color: "text-blue-600", bg: "bg-blue-50", icon: "#building-storefront" },
                                { label: "دسته‌بندی‌ها", value: `${category.length}`, color: "text-purple-600", bg: "bg-purple-50", icon: "#tag" },
                                { label: "کاربران سایت", value: "۱,۲۴۰ نفر", color: "text-emerald-600", bg: "bg-emerald-50", icon: "#squares-2x2" },
                                { label: "کمبود موجودی", value: "۳ محصول", color: "text-rose-600", bg: "bg-rose-50", icon: "#bell" },
                            ].map((stat, i) => (
                                <div key={i} className="border border-gray-100 bg-gray-50/40 rounded-2xl p-5 flex items-center justify-between">
                                    <div className="space-y-1.5">
                                        <span className=" text-gray-400 block font-bold">{stat.label}</span>
                                        <span className="text-lg font-black text-gray-900 block">{stat.value}</span>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                        <svg className="w-6 h-6"><use href={stat.icon}></use></svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* بخش دوم: دسترسی سریع عملیاتی */}
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/20">
                            <h3 className=" font-black text-gray-900 mb-4">دسترسی سریع عملیاتی</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Link href="/admin/products/create" className="flex items-center justify-center gap-2 border border-dashed border-gray-200 hover:border-[#D92F4E] bg-white hover:text-[#D92F4E] p-4 rounded-xl  font-bold transition-all text-gray-600 group">
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#D92F4E]"><use href="#plus-circle"></use></svg>
                                    افزودن محصول جدید
                                </Link>
                                <Link href="/admin/products/category" className="flex items-center justify-center gap-2 border border-dashed border-gray-200 hover:border-[#D92F4E] bg-white hover:text-[#D92F4E] p-4 rounded-xl  font-bold transition-all text-gray-600 group">
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#D92F4E]"><use href="#tag"></use></svg>
                                    ساخت دسته‌بندی جدید
                                </Link>
                                <Link href="/admin/products/manage-products" className="flex items-center justify-center gap-2 border border-dashed border-gray-200 hover:border-[#D92F4E] bg-white hover:text-[#D92F4E] p-4 rounded-xl  font-bold transition-all text-gray-600 group">
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#D92F4E]"><use href="#building-storefront"></use></svg>
                                    بررسی انبار کالاها
                                </Link>
                            </div>
                        </div>

                        {/* بخش سوم: آخرین محصولات افزوده شده */}
                        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
                            <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                                <h3 className=" font-black text-gray-900">آخرین قطعات اضافه شده به البرز سی‌ان‌سی</h3>
                                <Link href="/admin/products/manage-products" className=" font-bold text-[#D92F4E] hover:underline">مشاهده همه</Link>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {[
                                    { name: "بلبرینگ سرامیکی پیشرفته اسپیندل HQD", cat: "قطعات یدکی", price: "۴,۲۰۰,۰۰۰ تومان" },
                                    { name: "دستگاه CNC سه محوره مدل آلفا ۱۲۰", cat: "دستگاه CNC", price: "۳۴۰,۰۰۰,۰۰۰ تومان" },
                                    { name: "تیغچه اینسرت برش الماسه تنگستن", cat: "ابزارآلات برش", price: "۸۵۰,۰۰۰ تومان" },
                                ].map((prod, index) => (
                                    <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50/30 transition-all ">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold">#{index + 1}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 ">{prod.name}</h4>
                                                <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{prod.cat}</span>
                                            </div>
                                        </div>
                                        <div className="font-black text-gray-900">{prod.price}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </>
    )
}