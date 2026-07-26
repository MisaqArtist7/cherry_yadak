import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/prisma"
import DeleteProductButton from "@/features/admin/product/components/DeleteProductButton"
import StockInput from "@/features/admin/product/components/StockInput"

const PAGE_SIZE = 10; // تعداد محصولات در هر صفحه

export default async function ManageProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string; page?: string }>
}) {
    const { q, category, page } = await searchParams
    const currentPage = Math.max(1, Number(page) || 1)

    // شرط فیلتر مشترک برای شمارش و دریافت داده‌ها
    const whereCondition = {
        ...(category ? { categoryId: Number(category) } : {}),
        ...(q ? {
            OR: [
                { title: { contains: q, mode: 'insensitive' as const } },
            ]
        } : {}),
    }

    // دریافت دسته‌بندی‌های اصلی، محصولات صفحه‌جاری و تعداد کل محصولات
    const [categories, products, totalProducts] = await Promise.all([
        prisma.categories.findMany({
            where: { parentId: null },
            select: { 
                id: true, 
                name: true,
                children: {
                    select: { id: true, name: true }
                }
            },
        }),
        prisma.product.findMany({
            where: whereCondition,
            include: {
                images: true,
                category: true,
                brand: true,
            },
            take: PAGE_SIZE,
            skip: (currentPage - 1) * PAGE_SIZE,
            orderBy: { id: 'desc' }
        }),
        prisma.product.count({ where: whereCondition })
    ])

    const totalPages = Math.ceil(totalProducts / PAGE_SIZE)

    // تابع کمکی برای ساخت URL صفحه‌بندی با حفظ سایر پارامترهای جستجو
    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams()
        if (q) params.set('q', q)
        if (category) params.set('category', category)
        params.set('page', pageNumber.toString())
        return `?${params.toString()}`
    }

    return (
        <section className="min-h-screen p-4 md:p-8 bg-gray-50/50">
            <div className="flex-1 flex flex-col gap-5 max-w-7xl mx-auto w-full">
                
                {/* هدر صفحه */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                            مدیریت محصولات
                        </h1>
                        <p className="font-medium md:text-gray-500 mt-1">
                            لیست، ویرایش، حذف و مدیریت موجودی کالاها <span className="text-(--primaryColor) font-bold">({totalProducts.toLocaleString('fa-IR')} محصول)</span>
                        </p>
                    </div>
                    <Link 
                        href="/admin/products/create-product" 
                        className="inline-flex items-center justify-center gap-2 bg-(--primaryColor) hover:bg-(--hoverColor) text-white font-bold md:
                            px-5 py-2.5 rounded-xl shadow-md shadow-rose-600/10 transition-all cursor-pointer shrink-0"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        افزودن محصول جدید
                    </Link>
                </div>

                {/* فیلترها و جستجو */}
                <form className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="w-full sm:max-w-md relative">
                        <input 
                            name="q"
                            type="search" 
                            defaultValue={q || ''}
                            placeholder="جستجوی محصول بر اساس نام..." 
                            className="w-full font-medium border rounded-xl pr-10 pl-3 py-2 md:
                                outline-none transition-all border-rose-500 bg-white ring-4 ring-rose-500/5 text-gray-800 placeholder-gray-400"
                        />
                        <svg className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="w-full sm:w-64 flex items-center gap-2">
                        <div className="relative w-full">
                            <select 
                                name="category"
                                defaultValue={category || ''}
                                className="w-full border border-gray-200 bg-gray-50 rounded-xl pr-3 pl-8 py-2 font-bold text-gray-700 outline-none focus:bg-white focus:border-rose-500 transition-all cursor-pointer appearance-none"
                            >
                                <option value="">همه دسته‌بندی‌ها</option>
                                {categories.map((cat) => (
                                    <>
                                        {/* دسته‌بندی اصلی */}
                                        <option key={cat.id} value={cat.id} className="font-bold">
                                            {cat.name}
                                        </option>
                                        {/* زیردسته‌بندی‌ها */}
                                        {cat.children?.map((child) => (
                                            <option key={child.id} value={child.id}>
                                                — {child.name}
                                            </option>
                                        ))}
                                    </>
                                ))}
                            </select>

                            <svg 
                                className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        <button 
                            type="submit" 
                            className="bg-rose-100 border border-dashed border-(--primaryColor) hover:bg-(--primaryColor) hover:text-white text-gray-800 px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer shrink-0"
                        >
                            اعمال
                        </button>
                    </div>
                </form>

                {/* جدول نمایش محصولات */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 text-gray-500 font-extrabold uppercase tracking-wider border-b border-gray-100  md:">
                                    <th className="p-3 text-center w-16">تصویر</th>
                                    <th className="p-3 min-w-48">نام محصول</th>
                                    <th className="p-3">دسته‌بندی</th>
                                    <th className="p-3">برند</th>
                                    <th className="p-3">قیمت</th>
                                    <th className="p-3 text-center">وضعیت انبار</th>
                                    <th className="p-3 text-center w-32">تعداد موجودی</th>
                                    <th className="p-3 text-center w-24">عملیات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium text-gray-700 md:">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-10 text-gray-400 font-bold">
                                            هیچ محصولی یافت نشد!
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => {
                                        const imageMain = product.images.find((img) => img.isMain) || product.images[0]
                                        return (
                                            <tr key={product.id} className="hover:bg-gray-50/60 transition-colors group">
                                                <td className="p-3 text-center">
                                                    <div className="relative w-10 h-10 bg-gray-100 rounded-lg overflow-hidden border border-gray-200/60 mx-auto group-hover:scale-105 transition-transform duration-200">
                                                        <Image src={imageMain?.url || "/images/default.jpg"} fill className="object-cover" alt="" />
                                                    </div>
                                                </td>
                                                <td className="p-3">
                                                    <span className="block font-bold text-gray-900 line-clamp-1 md:" title={product.title}>
                                                        {product.title}
                                                    </span>
                                                    <span className="block  text-gray-400 mt-0.5 font-semibold">کد: #{product.id}</span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="text-gray-700 bg-gray-100/80 px-2.5 py-1 rounded-md  font-bold">
                                                        {product.category?.name || "—"}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="text-gray-600 font-bold ">{product.brand?.name || "—"}</span>
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex flex-col">
                                                        <span className="font-extrabold text-gray-900 md:">
                                                            {(product.discount || product.price).toLocaleString('fa-IR')} <span className="font-normal  text-gray-400">تومان</span>
                                                        </span>
                                                        {product.discount && (
                                                            <span className=" text-rose-500 font-bold line-through">
                                                                {product.price.toLocaleString('fa-IR')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full  font-bold ${
                                                        !product.isActive || product.stock === 0
                                                            ? 'bg-rose-50 text-rose-600'
                                                            : product.stock <= 5
                                                            ? 'bg-amber-50 text-amber-700'
                                                            : 'bg-emerald-50 text-emerald-700'
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                                            !product.isActive || product.stock === 0
                                                                ? 'bg-rose-500'
                                                                : product.stock <= 5
                                                                ? 'bg-amber-500 animate-pulse'
                                                                : 'bg-emerald-500'
                                                        }`}></span>
                                                        
                                                        {!product.isActive || product.stock === 0
                                                            ? 'ناموجود'
                                                            : product.stock <= 5
                                                            ? 'کمبود موجودی'
                                                            : 'موجود'
                                                        }
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <StockInput productId={product.id} initialStock={product.stock} />
                                                </td>
                                                <td className="p-3 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Link 
                                                            href={`/admin/products/edit-product/${product.slug}`} 
                                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer" 
                                                            title="ویرایش محصول"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </Link>
                                                        <DeleteProductButton productId={product.id} title={product.title} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* بخش صفحه‌بندی (Pagination) */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/50 flex-wrap gap-3">
                            <span className=" text-gray-500 font-medium">
                                نمایش صفحه <span className="font-bold text-gray-800">{currentPage.toLocaleString('fa-IR')}</span> از <span className="font-bold text-gray-800">{totalPages.toLocaleString('fa-IR')}</span>
                            </span>

                            <div className="flex items-center gap-1">
                                {/* دکمه قبلی */}
                                {currentPage > 1 ? (
                                    <Link
                                        href={createPageUrl(currentPage - 1)}
                                        className="px-3 py-1.5  font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        قبلی
                                    </Link>
                                ) : (
                                    <span className="px-3 py-1.5  font-bold text-gray-300 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                                        قبلی
                                    </span>
                                )}

                                {/* شماره صفحات */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={createPageUrl(pageNum)}
                                        className={`px-3 py-1.5  font-bold rounded-lg transition-colors ${
                                            pageNum === currentPage
                                                ? 'bg-(--primaryColor) text-white shadow-sm'
                                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                                        }`}
                                    >
                                        {pageNum.toLocaleString('fa-IR')}
                                    </Link>
                                ))}

                                {/* دکمه بعدی */}
                                {currentPage < totalPages ? (
                                    <Link
                                        href={createPageUrl(currentPage + 1)}
                                        className="px-3 py-1.5  font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        بعدی
                                    </Link>
                                ) : (
                                    <span className="px-3 py-1.5  font-bold text-gray-300 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                                        بعدی
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}