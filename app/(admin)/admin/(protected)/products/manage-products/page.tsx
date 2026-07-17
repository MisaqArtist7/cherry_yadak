import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/prisma"

export default async function ManageProductsPage() {
    const categories = await prisma.categories.findMany({
        select: {
            id:true,
            name: true,
        }
    })
    const products = await prisma.product.findMany({
        include: {
            images: true,
            category: true,
            brand: true,
        },
        orderBy: {
            id: 'desc' // نمایش جدیدترین محصولات در بالا
        }
    })

    // محاسبه آمارهای کوچک برای بالای صفحه
    const totalProducts = products.length
    const activeProducts = products.filter(p => p.isActive).length
    const outOfStockProducts = products.filter(p => p.stock === 0).length
    
    return (
        <>
            <section className="min-h-screen flex gap-8 p-4 md:p-8 bg-gray-50/50">         

                {/* بخش اصلی مدیریت محصولات */}
                <div className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
                    
                    {/* هدر صفحه و خلاصه آمار */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">مدیریت محصولات</h1>
                            <p className=" text-gray-500 mt-1">لیست، ویرایش، حذف و مدیریت موجودی محصولات فروشگاه</p>
                        </div>
                        <Link 
                            href="/admin/products/create" 
                            className="inline-flex items-center justify-center gap-2 bg-(--primaryColor) text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-(--primaryColor)/20 hover:opacity-95 transition-all  cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            افزودن محصول جدید
                        </Link>
                    </div>

                    {/* کارت‌های آمار سریع */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                                <svg className="w-5 h-5">
                                    <use href="#cube"></use>
                                </svg>
                            </div>
                            <div>
                                <span className="block  text-gray-400 font-medium">کل محصولات</span>
                                <span className="text-xl font-black text-gray-900">{totalProducts} کالا</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <span className="block  text-gray-400 font-medium">فعال و موجود</span>
                                <span className="text-xl font-black text-emerald-600">{activeProducts} کالا</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                            <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <div>
                                <span className="block  text-gray-400 font-medium">اتمام موجودی</span>
                                <span className="text-xl font-black text-rose-600">{outOfStockProducts} کالا</span>
                            </div>
                        </div>
                    </div>

                    {/* فیلترها و جستجو */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* فیلد جستجو */}
                        <div className="w-full sm:max-w-md relative">
                            <input 
                                type="search" 
                                placeholder="جستجوی محصول بر اساس نام، شناسه یا برند..." 
                                className="w-full font-medium bg-gray-50 border border-gray-200/80 rounded-xl pr-11 pl-4 py-3 outline-none transition-all focus:border-(--primaryColor) focus:bg-white focus:ring-4 focus:ring-(--primaryColor)/5  text-gray-800 placeholder-gray-400"
                            />
                            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* فیلتر دسته‌بندی */}
                        <div className="w-full sm:w-64">
                            <select className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 font-bold text-gray-600  outline-none focus:bg-white focus:border-(--primaryColor) focus:ring-4 focus:ring-(--primaryColor)/5 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a0aec0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[position:left_14px_center] bg-no-repeat pl-10">
                                <option value="">همه دسته‌بندی‌ها</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* جدول نمایش محصولات */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/70 text-gray-500 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                                        <th className="p-4 text-center w-20">تصویر</th>
                                        <th className="p-4 min-w-[200px]">نام محصول</th>
                                        <th className="p-4">دسته‌بندی</th>
                                        <th className="p-4">برند</th>
                                        <th className="p-4">قیمت اصلی</th>
                                        <th className="p-4">با تخفیف</th>
                                        <th className="p-4 text-center">وضعیت</th>
                                        <th className="p-4 text-center w-36">به‌روزرسانی انبار</th>
                                        <th className="p-4 text-center w-28">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 font-medium  text-gray-600">
                                    {products.map((product) => {
                                        const imageMain = product.images.find((img) => img.isMain) || product.images[0]
                                        return (
                                            <tr key={product.id} className="hover:bg-gray-50/40 transition-colors group">
                                                {/* تصویر */}
                                                <td className="p-4 text-center">
                                                    <div className="relative w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mx-auto group-hover:scale-105 transition-transform duration-200">
                                                        <Image src={imageMain?.url || "/images/default.jpg"} fill className="object-cover" alt="" />
                                                    </div>
                                                </td>
                                                {/* نام محصول */}
                                                <td className="p-4">
                                                    <span className="block font-bold text-gray-900 max-w-xs truncate" title={product.title}>
                                                        {product.title}
                                                    </span>
                                                    <span className="block text-xs text-gray-400 mt-0.5">کد: {product.id.toString().slice(-6)}</span>
                                                </td>
                                                {/* دسته‌بندی */}
                                                <td className="p-4">
                                                    <span className="text-gray-600 bg-gray-100/70 px-2.5 py-1 rounded-lg text-xs font-semibold">
                                                        {product.category?.name || "—"}
                                                    </span>
                                                </td>
                                                {/* برند */}
                                                <td className="p-4">
                                                    <span className="text-gray-500 font-semibold">{product.brand?.name || "—"}</span>
                                                </td>
                                                {/* قیمت */}
                                                <td className="p-4 font-bold text-gray-900">
                                                    {product.price.toLocaleString('fa-IR')} <span className="text-xs font-normal text-gray-400 mr-0.5">تومان</span>
                                                </td>
                                                {/* قیمت تخفیف */}
                                                <td className="p-4">
                                                    {product.discount ? (
                                                        <span className="font-bold text-rose-600">
                                                            {product.discount.toLocaleString('fa-IR')} <span className="text-xs font-normal text-rose-400 mr-0.5">تومان</span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 font-normal">بدون تخفیف</span>
                                                    )}
                                                </td>
                                                {/* وضعیت */}
                                                <td className="p-4 text-center">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                                        product.isActive && product.stock > 0
                                                            ? 'bg-emerald-50 text-emerald-700' 
                                                            : 'bg-rose-50 text-rose-600'
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${product.isActive && product.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                                        {product.isActive && product.stock > 0 ? `موجود (${product.stock})` : 'ناموجود'}
                                                    </span>
                                                </td>
                                                {/* به‌روزرسانی سریع موجودی */}
                                                <td className="p-4">
                                                    <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-1 max-w-[110px] mx-auto focus-within:border-(--primaryColor) focus-within:bg-white transition-all">
                                                        <input 
                                                            type="number" 
                                                            defaultValue={product.stock} 
                                                            min="0"
                                                            className="w-full bg-transparent border-0 text-center font-bold text-gray-900 outline-none py-1 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                    </div>
                                                </td>
                                                {/* عملیات */}
                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Link href={`/admin/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer" title="ویرایش محصول">
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                        </Link>
                                                        <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer" title="حذف محصول">
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}