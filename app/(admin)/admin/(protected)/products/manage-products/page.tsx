import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/prisma"
import DeleteProductButton from "@/features/admin/product/components/DeleteProductButton"
import StockInput from "@/features/admin/product/components/StockInput"

export default async function ManageProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>
}) {
    const { q, category } = await searchParams

    const [categories, products] = await Promise.all([
        prisma.categories.findMany({
            select: { id: true, name: true },
        }),
        prisma.product.findMany({
            where: {
                ...(category ? { categoryId: Number(category) } : {}),
                ...(q ? {
                    OR: [
                        { title: { contains: q, mode: 'insensitive' } },
                    ]
                } : {}),
            },
            include: {
                images: true,
                category: true,
                brand: true,
            },
            orderBy: { id: 'desc' }
        })
    ])

    return (
        <section className="min-h-screen p-4 md:p-8 bg-gray-50/50">
            <div className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
                
                {/* هدر صفحه */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                            مدیریت محصولات
                        </h1>
                        <p className=" font-semibold text-gray-500 mt-1">
                            لیست، ویرایش، حذف و مدیریت موجودی کالاها ({products.length} محصول)
                        </p>
                    </div>
                    <Link 
                        href="/admin/products/create-product" 
                        className="inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-rose-600/20 transition-all cursor-pointer  shrink-0"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        افزودن محصول جدید
                    </Link>
                </div>

                {/* فیلترها و جستجو */}
                <form className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="w-full sm:max-w-md relative">
                        <input 
                            name="q"
                            type="search" 
                            defaultValue={q || ''}
                            placeholder="جستجوی محصول بر اساس نام..." 
                            className="w-full font-medium  bg-gray-50 border border-gray-200 rounded-xl pr-11 pl-4 py-3 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/5 text-gray-800 placeholder-gray-400"
                        />
                        <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="w-full sm:w-72 flex items-center gap-2">
                        <select 
                            name="category"
                            defaultValue={category || ''}
                            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 font-bold  text-gray-700 outline-none focus:bg-white focus:border-rose-500 transition-all cursor-pointer"
                        >
                            <option value="">همه دسته‌بندی‌ها</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-xl font-bold  transition-colors cursor-pointer shrink-0">
                            اعمال
                        </button>
                    </div>
                </form>

                {/* جدول نمایش محصولات */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 text-gray-500 font-extrabold  uppercase tracking-wider border-b border-gray-100">
                                    <th className="p-4 text-center w-20">تصویر</th>
                                    <th className="p-4 min-w-55">نام محصول</th>
                                    <th className="p-4">دسته‌بندی</th>
                                    <th className="p-4">برند</th>
                                    <th className="p-4">قیمت</th>
                                    <th className="p-4 text-center">وضعیت انبار</th>
                                    <th className="p-4 text-center w-36">تعداد موجودی</th>
                                    <th className="p-4 text-center w-28">عملیات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium  text-gray-700">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-12 text-gray-400 font-bold text-lg">
                                            هیچ محصولی یافت نشد!
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => {
                                        const imageMain = product.images.find((img) => img.isMain) || product.images[0]
                                        return (
                                            <tr key={product.id} className="hover:bg-gray-50/60 transition-colors group">
                                                <td className="p-4 text-center">
                                                    <div className="relative w-12 h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-200/60 mx-auto group-hover:scale-105 transition-transform duration-200">
                                                        <Image src={imageMain?.url || "/images/default.jpg"} fill className="object-cover" alt="" />
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="block font-bold text-gray-900  line-clamp-1" title={product.title}>
                                                        {product.title}
                                                    </span>
                                                    <span className="block  text-gray-400 mt-1 font-mono font-semibold">کد: #{product.id}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-gray-700 bg-gray-100/80 px-3 py-1.5 rounded-lg  font-bold">
                                                        {product.category?.name || "—"}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-gray-600 font-bold ">{product.brand?.name || "—"}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-gray-900 ">
                                                            {(product.discount || product.price).toLocaleString('fa-IR')} <span className=" font-normal text-gray-400">تومان</span>
                                                        </span>
                                                        {product.discount && (
                                                            <span className=" text-rose-500 font-bold line-through">
                                                                {product.price.toLocaleString('fa-IR')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full  font-black ${
                                                        product.isActive && product.stock > 0
                                                            ? 'bg-emerald-50 text-emerald-700' 
                                                            : 'bg-rose-50 text-rose-600'
                                                    }`}>
                                                        <span className={`w-2 h-2 rounded-full ${product.isActive && product.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                                        {product.isActive && product.stock > 0 ? 'موجود' : 'ناموجود'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <StockInput productId={product.id} initialStock={product.stock} />
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <Link href={`/admin/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer" title="ویرایش محصول">
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                        </Link>
                                                        
                                                        {/* دکمه حذف با قابلیت اکشن و مودال */}
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
                </div>

            </div>
        </section>
    )
}