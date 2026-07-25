import Link from "next/link"
import prisma from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const [
        totalProducts,
        totalCategories,
        lowStockCount,
        siteVisitCount,
        latestProducts
    ] = await Promise.all([
        prisma.product.count(),
        prisma.categories.count(),
        prisma.product.count({ where: { stock: { lt: 5 } } }),
        prisma.siteVisit.count(),
        prisma.product.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        })
    ])

    const isStockHealthy = lowStockCount === 0

    return (
        <section className="min-h-screen bg-slate-50/50 p-6 md:p-10 space-y-8">
            {/* هدر صفحه */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        میز کار ادمین
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 font-medium mt-2">
                        خلاصه‌ی وضعیت فروشگاه پیشرو تک
                    </p>
                </div>
                <div className="text-slate-800 bg-slate-100/80 border border-slate-200/60 px-5 py-3 rounded-2xl shadow-sm text-base md:text-lg font-bold flex items-center gap-2">
                    <span>خوش آمدید، میثاق عزیز</span>
                    <span className="text-xl">👋</span>
                </div>
            </div>

            {/* بخش اول: باکس‌های آمار سریع */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        label: "کل محصولات",
                        value: totalProducts.toLocaleString('fa-IR'),
                        icon: "#building-storefront",
                        iconColor: "text-blue-600",
                        iconBg: "bg-blue-50/80",
                        borderColor: "border-blue-100",
                    },
                    {
                        label: "دسته‌بندی‌ها",
                        value: totalCategories.toLocaleString('fa-IR'),
                        icon: "#swatch",
                        iconColor: "text-purple-600",
                        iconBg: "bg-purple-50/80",
                        borderColor: "border-purple-100",
                    },
                    {
                        label: "بازدید کل سایت",
                        value: `${siteVisitCount.toLocaleString('fa-IR')} بار`,
                        icon: "#eye", // یا هر آیکون مرتبط با آمار/بازدید
                        iconColor: "text-emerald-600",
                        iconBg: "bg-emerald-50/80",
                        borderColor: "border-emerald-100",
                    },
                    {
                        label: "وضعیت موجودی انبار",
                        value: isStockHealthy ? "کاملاً پایدار" : `${lowStockCount.toLocaleString('fa-IR')} کالا کم‌موجود`,
                        icon: "#cube",
                        iconColor: isStockHealthy ? "text-emerald-600" : "text-rose-600",
                        iconBg: isStockHealthy ? "bg-emerald-50/80" : "bg-rose-50/80",
                        borderColor: isStockHealthy ? "border-emerald-100" : "border-rose-100",
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-3xl p-6 flex items-center justify-between border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="space-y-2">
                            <span className="text-slate-500 block font-bold text-base md:text-lg">
                                {stat.label}
                            </span>
                            <span className="text-2xl md:text-3xl font-black text-slate-900 block">
                                {stat.value}
                            </span>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${stat.borderColor} ${stat.iconBg} ${stat.iconColor} shadow-sm shrink-0`}>
                            <svg className="w-7 h-7"><use href={stat.icon}></use></svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* بخش دوم: دسترسی سریع عملیاتی */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm shadow-slate-200/50 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 border-r-4 border-[#D92F4E] pr-3">
                    دسترسی سریع عملیاتی
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        href="/admin/products/create-product"
                        className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-200 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-5 rounded-2xl text-base md:text-lg font-extrabold transition-all duration-200 text-slate-700 group shadow-sm hover:shadow-md"
                    >
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-[#D92F4E] transition-colors"><use href="#plus-circle"></use></svg>
                        افزودن محصول جدید
                    </Link>
                    <Link
                        href="/admin/products/create-category"
                        className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-200 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-5 rounded-2xl text-base md:text-lg font-extrabold transition-all duration-200 text-slate-700 group shadow-sm hover:shadow-md"
                    >
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-[#D92F4E] transition-colors"><use href="#tag"></use></svg>
                        ساخت دسته‌بندی جدید
                    </Link>
                    <Link
                        href="/admin/products/manage-products"
                        className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-200 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-5 rounded-2xl text-base md:text-lg font-extrabold transition-all duration-200 text-slate-700 group shadow-sm hover:shadow-md"
                    >
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-[#D92F4E] transition-colors"><use href="#building-storefront"></use></svg>
                        بررسی انبار کالاها
                    </Link>
                </div>
            </div>

            {/* بخش سوم: آخرین محصولات افزوده شده */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 border-r-4 border-[#D92F4E] pr-3">
                        آخرین محصولات اضافه شده به پیشرو تک
                    </h3>
                    <Link 
                        href="/admin/products/manage-products" 
                        className="text-base font-extrabold text-[#D92F4E] bg-[#D92F4E]/10 hover:bg-[#D92F4E] hover:text-white border border-dashed border-[#D92F4E] px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm"
                    >
                        مشاهده همه
                    </Link>
                </div>

                <div className="divide-y divide-slate-100">
                    {latestProducts.length === 0 && (
                        <div className="p-12 text-center space-y-3">
                            <p className="text-slate-400 font-bold text-lg">هنوز محصولی ثبت نشده</p>
                            <Link href="/admin/products/create" className="inline-block text-[#D92F4E] font-black text-lg hover:underline">
                                اولین محصول را اضافه کنید
                            </Link>
                        </div>
                    )}

                    {latestProducts.map((prod, index) => (
                        <div key={prod.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-all duration-150">
                            <div className="flex items-center gap-5">
                                <div className="w-11 h-11 bg-slate-100 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-600 font-black text-lg shrink-0">
                                    {(index + 1).toLocaleString('fa-IR')}
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-slate-900 text-lg md:text-xl">
                                        {prod.title}
                                    </h4>
                                    <span className="text-slate-500 font-medium text-sm md:text-base block mt-1">
                                        {prod.category?.name || "بدون دسته‌بندی"}
                                    </span>
                                </div>
                            </div>
                            <div className="font-black text-slate-900 text-lg md:text-xl bg-slate-100/80 border border-slate-200/50 px-4 py-2 rounded-xl self-end sm:self-auto">
                                {prod.price.toLocaleString('fa-IR')} تومان
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}