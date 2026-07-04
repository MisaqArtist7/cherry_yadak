import Sidebar from "@/components/layout/Admin/Sidebar"
import Header from "@/components/layout/Admin/Header"
import Link from "next/link"
import prisma from "@/lib/prisma"

export default async function AdminPage() {
    const totalProducts = await prisma.product.count()
    const totalCategories = await prisma.categories.count()
    const lowStockCount = await prisma.product.count({
        where: { stock: { lt: 5 } }
    })

    const latestProducts = await prisma.product.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    })

    const isStockHealthy = lowStockCount === 0

    return (
        <>
            <Header />

            <section className="min-h-screen flex gap-8 p-6 md:p-8">
                <Sidebar />

                <div className="flex-1 space-y-8">

                    {/* هدر صفحه */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900">میز کار ادمین</h1>
                            <p className="text-gray-500 font-medium mt-1">خلاصه‌ی وضعیت فروشگاه پیشرو تک</p>
                        </div>
                        <span className="text-gray-900 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
                            خوش آمدید، میثاق عزیز 👋
                        </span>
                    </div>

                    {/* بخش اول: باکس‌های آمار سریع */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                label: "کل محصولات",
                                value: totalProducts.toLocaleString('fa-IR'),
                                icon: "#building-storefront",
                                iconColor: "text-blue-600",
                                iconBg: "bg-blue-50",
                                iconBr: "border-blue-100",
                            },
                            {
                                label: "دسته‌بندی‌ها",
                                value: totalCategories.toLocaleString('fa-IR'),
                                icon: "#swatch",
                                iconColor: "text-purple-600",
                                iconBg: "bg-purple-50",
                                iconBr: "border-blue-100",
                            },
                            {
                                label: "کاربران سایت",
                                value: `${(1240).toLocaleString('fa-IR')} نفر`,
                                icon: "#users",
                                iconColor: "text-emerald-600",
                                iconBg: "bg-emerald-50",
                                iconBr: "border-blue-100",
                            },
                            {
                                label: "وضعیت موجودی انبار",
                                value: isStockHealthy ? "کاملاً پایدار" : `${lowStockCount.toLocaleString('fa-IR')} کالا کم‌موجود`,
                                icon: "#cube",
                                iconColor: isStockHealthy ? "text-emerald-600" : "text-rose-600",
                                iconBg: isStockHealthy ? "bg-emerald-50" : "bg-rose-50",
                            },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-5 flex items-center justify-between border border-gray-100 shadow-sm shadow-gray-200/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <div className="space-y-1.5">
                                    <span className="text-gray-500 block font-bold ">{stat.label}</span>
                                    <span className="text-lg font-black text-gray-900 block">{stat.value}</span>
                                </div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.iconBg} ${stat.iconColor}`}>
                                    <svg className="w-6 h-6"><use href={stat.icon}></use></svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* بخش دوم: دسترسی سریع عملیاتی */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-200/50">
                        <h3 className="text-xl text-gray-900 p-2 mb-4">دسترسی سریع عملیاتی</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Link
                                href="/admin/products/create"
                                className="flex items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-4 rounded-xl font-bold transition-all text-gray-600 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D92F4E]"><use href="#plus-circle"></use></svg>
                                افزودن محصول جدید
                            </Link>
                            <Link
                                href="/admin/products/category"
                                className="flex items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-4 rounded-xl font-bold transition-all text-gray-600 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D92F4E]"><use href="#tag"></use></svg>
                                ساخت دسته‌بندی جدید
                            </Link>
                            <Link
                                href="/admin/products/manage-products"
                                className="flex items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-4 rounded-xl font-bold transition-all text-gray-600 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D92F4E]"><use href="#building-storefront"></use></svg>
                                بررسی انبار کالاها
                            </Link>
                        </div>
                    </div>

                    {/* بخش سوم: آخرین محصولات افزوده شده */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50 overflow-hidden">
                        <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-xl text-gray-900">آخرین قطعات اضافه شده به پیشرو تک</h3>
                            <Link href="/admin/products/manage-products" className="font-medium hover:bg-[#D92F4E] hover:text-white text-[#D92F4E] bg-[#D92F4E]/5 border border-dashed px-2 py-1 rounded-xl">
                                مشاهده همه
                            </Link>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {latestProducts.length === 0 && (
                                <div className="p-10 text-center">
                                    <p className="text-gray-400 font-medium">هنوز محصولی ثبت نشده</p>
                                    <Link href="/admin/products/create" className="inline-block mt-3 text-[#D92F4E] font-bold hover:underline ">
                                        اولین محصول را اضافه کنید
                                    </Link>
                                </div>
                            )}

                            {latestProducts.map((prod, index) => (
                                <div key={prod.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold ">
                                            {(index + 1).toLocaleString('fa-IR')}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{prod.title}</h4>
                                            <span className="text-gray-400 font-medium block mt-0.5 
">
                                                {prod.category?.name || "بدون دسته‌بندی"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="font-black text-gray-900">
                                        {prod.price.toLocaleString('fa-IR')} تومان
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}