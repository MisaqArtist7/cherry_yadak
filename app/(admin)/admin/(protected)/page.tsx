import Link from "next/link"
import prisma from "@/lib/prisma"
import { unstable_cache } from "next/cache"

// تعریف تابع گرفتن آمار و کش کردن آن با تگ مشخص
const getAdminStats = unstable_cache(
    async () => {
        return await Promise.all([
            prisma.product.count(),
            prisma.categories.count(),
            prisma.brand.count(),
            prisma.siteVisit.count(),
            prisma.product.findMany({
                take: 3,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    price: true,
                    category: {
                        select: { name: true }
                    }
                }
            })
        ])
    },
    ['admin-dashboard-stats'], // کلید کش داخلی
    { tags: ['admin-stats'] }  // تگ اختصاصی برای پاک کردن کش
)

export default async function AdminPage() {
    const [
        totalProducts,
        totalCategories,
        totalBrands,
        siteVisitCount,
        latestProducts
    ] = await getAdminStats()

    return (
        <section className="min-h-screen bg-slate-50/50 p-6 md:p-10 space-y-8">
            {/* هدر صفحه */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                        میز کار ادمین
                    </h1>
                    <p className=" md: text-slate-500 font-medium mt-1">
                        خلاصه‌ی وضعیت فروشگاه پیشرو تک
                    </p>
                </div>
                <div className="text-slate-800 bg-slate-100/80 border border-slate-200/60 px-4 py-2 rounded-2xl shadow-sm  md: font-semibold flex items-center gap-2">
                    <span>خوش آمدید، میثاق عزیز</span>
                    <span className="text-base">👋</span>
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
                        label: "تعداد برندها",
                        value: totalBrands.toLocaleString('fa-IR'),
                        icon: "#tag",
                        iconColor: "text-amber-600",
                        iconBg: "bg-amber-50/80",
                        borderColor: "border-amber-100",
                    },
                    {
                        label: "بازدید کل سایت",
                        value: `${siteVisitCount.toLocaleString('fa-IR')} بار`,
                        icon: "#eye",
                        iconColor: "text-emerald-600",
                        iconBg: "bg-emerald-50/80",
                        borderColor: "border-emerald-100",
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-3xl p-6 flex items-center justify-between border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="space-y-1">
                            <span className="text-slate-500 block font-medium  md:">
                                {stat.label}
                            </span>
                            <span className="text-lg md:text-xl font-bold text-slate-900 block">
                                {stat.value}
                            </span>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${stat.borderColor} ${stat.iconBg} ${stat.iconColor} shadow-sm shrink-0`}>
                            <svg className="w-6 h-6"><use href={stat.icon}></use></svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* بخش دوم: دسترسی سریع عملیاتی */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm shadow-slate-200/50 space-y-6">
                <h3 className="text-base md:text-lg font-bold text-slate-900 border-r-4 border-[#D92F4E] pr-3">
                    دسترسی سریع عملیاتی
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        href="/admin/products/create-product"
                        className="flex items-center justify-center gap-2.5 border-2 border-dashed border-slate-200 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-4 rounded-2xl  md: font-bold transition-all duration-200 text-slate-700 group shadow-sm hover:shadow-md"
                    >
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-[#D92F4E] transition-colors"><use href="#plus-circle"></use></svg>
                        افزودن محصول جدید
                    </Link>
                    <Link
                        href="/admin/products/create-category"
                        className="flex items-center justify-center gap-2.5 border-2 border-dashed border-slate-200 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-4 rounded-2xl  md: font-bold transition-all duration-200 text-slate-700 group shadow-sm hover:shadow-md"
                    >
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-[#D92F4E] transition-colors"><use href="#tag"></use></svg>
                        ساخت دسته‌بندی جدید
                    </Link>
                    <Link
                        href="/admin/products/manage-products"
                        className="flex items-center justify-center gap-2.5 border-2 border-dashed border-slate-200 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 hover:text-[#D92F4E] p-4 rounded-2xl  md: font-bold transition-all duration-200 text-slate-700 group shadow-sm hover:shadow-md"
                    >
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-[#D92F4E] transition-colors"><use href="#building-storefront"></use></svg>
                        بررسی انبار کالاها
                    </Link>
                </div>
            </div>

            {/* بخش سوم: آخرین محصولات افزوده شده */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-base md:text-lg font-bold text-slate-900 border-r-4 border-[#D92F4E] pr-3">
                        آخرین محصولات اضافه شده به پیشرو تک
                    </h3>
                    <Link 
                        href="/admin/products/manage-products" 
                        className=" font-bold text-[#D92F4E] bg-[#D92F4E]/10 hover:bg-[#D92F4E] hover:text-white border border-dashed border-[#D92F4E] px-4 py-2 rounded-xl transition-all duration-200 shadow-sm"
                    >
                        مشاهده همه
                    </Link>
                </div>

                <div className="divide-y divide-slate-100">
                    {latestProducts.length === 0 && (
                        <div className="p-12 text-center space-y-3">
                            <p className="text-slate-400 font-medium  md:">هنوز محصولی ثبت نشده</p>
                            <Link href="/admin/products/create-product" className="inline-block text-[#D92F4E] font-bold  md: hover:underline">
                                اولین محصول را اضافه کنید
                            </Link>
                        </div>
                    )}

                    {latestProducts.map((prod, index) => (
                        <div key={prod.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-all duration-150">
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 bg-slate-100 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-600 font-bold  md: shrink-0">
                                    {(index + 1).toLocaleString('fa-IR')}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900  md:">
                                        {prod.title}
                                    </h4>
                                    <span className="text-slate-500 font-medium  block mt-0.5">
                                        دسته‌بندی: {prod.category?.name || "بدون دسته‌بندی"} 
                                    </span>
                                </div>
                            </div>
                            <div className="font-bold text-slate-900  md: bg-slate-100/80 border border-slate-200/50 px-3 py-1.5 rounded-xl self-end sm:self-auto">
                                {prod.price.toLocaleString('fa-IR')} تومان
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}