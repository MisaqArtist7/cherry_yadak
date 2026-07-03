import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/prisma"

export default async function ManageProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            images: true,
            category: true,
        },
    })
    
    return (
        <>
            {/* هدر بالا (کاملاً هماهنگ با تم) */}
            <header className="bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 py-4 sticky top-0 z-50" dir="rtl">
                <div className="flex items-center gap-6 grow"> {/* اضافه شدن grow برای باز شدن فضا */}
                    <Link href="/">
                        <Image src='/images/logo.svg' width={140} height={45} alt="البرز سی‌ان‌سی" className="h-9 w-auto cursor-pointer"/>
                    </Link>
                    
                    {/* فرم سرچ با قابلیت انیمیشن عرض (تغییر از max-w-xs به max-w-md در حالت فوکوس) */}
                    <form action="" className="w-full max-w-xs relative hidden sm:block transition-all duration-300 ease-in-out focus-within:max-w-md">
                        <input 
                            type="search" 
                            placeholder="جستجو..." 
                            className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 outline-none  transition-all focus:bg-white focus:border-(--primaryColor) focus:ring-4 focus:ring-(--primaryColor)/10"
                        />
                        <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <use href="#searchIcon"></use>
                        </svg>
                    </form>
                </div>

                <div className="flex items-center gap-3 shrink-0"> {/* اضافه شدن shrink-0 برای فیکس ماندن دکمه‌ها */}
                    <button className="bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 p-2.5 text-gray-500 transition-colors cursor-pointer">
                        <svg className="w-5 h-5"><use href="#bell"></use></svg>
                    </button>
                    <button className="bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 p-2.5 text-gray-500 transition-colors cursor-pointer">
                        <svg className="w-5 h-5"><use href="#arrow-left-start-on-rectangle"></use></svg>
                    </button>
                </div>
            </header>

            <section className="min-h-screen flex gap-8 p-6 md:p-8" dir="rtl">         
                
                {/* سایدبار ادمین */}
                <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-(--primaryColor)/20">
                            <Image src='/images/admin.jpg' fill alt="تصویر ادمین" className="object-cover rounded-full" />
                        </div>
                        <div>
                            <h2 className="font-black text-gray-900 text-base">میثاق باباخانی</h2>
                            <span className=" font-bold text-gray-400 block mt-1">مدیر کل مجموعه</span>
                        </div>
                    </div>

                    <nav className="mt-6 flex-1">
                        <ul className="flex flex-col gap-2">
                            {[
                                { label: 'میز کار', icon: '#squares-2x2', href: '/admin' },
                                { label: 'مدیریت محصولات', icon: '#building-storefront', href: '/admin/products/manage-products', active: true },
                                { label: 'افزودن محصول جدید', icon: '#plus-circle', href: '/admin/products/create' },
                                { label: 'افزودن دسته‌بندی', icon: '#tag', href: '/admin/products/category' },
                                { label: 'لیست کاربران', icon: '#users', href: '/admin/users' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={item.href} 
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl  font-bold transition-all duration-200 group ${
                                            item.active 
                                            ? 'bg-(--primaryColor) text-white shadow-lg shadow-(--primaryColor)/20' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                        }`}
                                    >
                                        <svg className={`w-5 h-5 transition-colors ${item.active ? 'text-white' : 'text-gray-400 group-hover:text-black'}`}>
                                            <use href={item.icon}></use>
                                        </svg>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
            
                {/* بخش اصلی مدیریت محصولات */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* دیو اول: ابزارهای جستجو و فیلتر */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100">
                        <div className="mb-8 pb-4 border-b border-gray-50 flex justify-between items-center">
                            <h1 className="text-xl font-black text-gray-900">فروشگاه - مدیریت محصولات</h1>
                            <span className=" font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md">مرحله ۱ از ۲</span>
                        </div>
                        <div className="flex items-center justify-between">
                            {/* فیلد جستجو */}
                            <div className="w-full sm:max-w-md relative">
                                <input 
                                    type="search" 
                                    placeholder="جستجوی محصول بر اساس نام، شناسه یا برند..." 
                                    className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-3 outline-none  transition-all focus:border-(--primaryColor) focus:bg-white focus:ring-4 focus:ring-(--primaryColor)/10"
                                />
                                <svg className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <use href="#searchIcon"></use>
                                </svg>
                            </div>

                            {/* فیلتر دسته‌بندی */}
                            <div className="w-full sm:w-64">
                                <select className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3  font-bold text-gray-600 outline-none focus:bg-white focus:border-(--primaryColor) focus:ring-4 focus:ring-(--primaryColor)/10 transition-all cursor-pointer">
                                    <option value="">فیلتر بر اساس دسته‌بندی</option>
                                    <option value="cnc">دستگاه CNC</option>
                                    <option value="parts">قطعات یدکی</option>
                                    <option value="tools">ابزارآلات برش</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* دیو دوم: جدول نمایش محصولات */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl border border-gray-100 overflow-hidden">
                        
                        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h2 className="font-black text-gray-900 text-base">لیست کل محصولات سایت</h2>
                            <span className=" font-bold text-(--primaryColor) bg-(--primaryColor)/10 px-3 py-1.5 rounded-xl">تعداد کل: ۲۴ محصول</span>
                        </div>

                        {/* جدول اسکرول‌پذیر در دسکتاپ‌های کوچک */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse ">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-700 font-bold border-b border-gray-100">
                                        <th className="p-4 text-center">تصویر</th>
                                        <th className="p-4">نام محصول</th>
                                        <th className="p-4">دسته‌بندی</th>
                                        <th className="p-4">برند</th>
                                        <th className="p-4">قیمت (تومان)</th>
                                        <th className="p-4 text-center">موجودی</th>
                                        <th className="p-4 text-center">وضعیت</th>
                                        <th className="p-4 text-center">به‌روزرسانی موجودی</th>
                                        <th className="p-4">قیمت تخفیف</th>
                                        <th className="p-4 text-center">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                                    {products.map((product) => {
                                        const imageMain = product.images.find((img) => img.isMain) || product.images[0]
                                        return (
                                            <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                                                {/* ۱. تصویر */}
                                                <td className="p-4 flex justify-center">
                                                    <div className="relative w-12 h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                                        <Image src={imageMain?.url || "/images/default.jpg"} fill className="object-cover" alt="" />
                                                    </div>
                                                </td>
                                                {/* ۲. نام محصول */}
                                                <td className="p-4 font-bold text-gray-900 max-w-xs truncate">{product.title}</td>
                                                {/* ۳. دسته‌بندی */}
                                                <td className="p-4 text-gray-500">{product.category?.name || "بدون دسته‌بندی"}</td>
                                                {/* ۴. برند */}
                                                <td className="p-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md  font-bold">{product.brand}</span></td>
                                                {/* ۵. قیمت */}
                                                <td className="p-4 text-gray-900 font-bold">{product.price}</td>
                                                {/* ۶. موجودی */}
                                                <td className="p-4 text-center font-bold text-gray-900">{product.stock} عدد</td>
                                                {/* ۷. وضعیت */}
                                                <td className="p-4 text-center">
                                                    <span className={`${product.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500' } px-2.5 py-1 rounded-full  font-bold`}>
                                                        {product.isActive ? 'موجود' : 'ناموجود'}
                                                    </span>
                                                </td>
                                                {/* ۸. به‌روزرسانی سریع موجودی (اینپوت درون‌جدولی مدرن) */}
                                                <td className="p-4">
                                                    <div className="flex justify-center">
                                                        <input 
                                                            type="number" 
                                                            defaultValue={product.stock} 
                                                            className="w-16 border border-gray-200 rounded-lg p-1.5 text-center  font-bold focus:border-(--primaryColor) outline-none"
                                                        />
                                                    </div>
                                                </td>
                                                {/* ۹. قیمت تخفیف */}
                                                <td className="p-4 text-rose-600 font-bold">{product.discount || "بدون تخفیف"}</td>
                                                {/* ۱۰. عملیات */}
                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {/* ویرایش */}
                                                        <Link href='/admin/products/edit' className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="ویرایش محصول">
                                                            <svg className="w-5 h-5"><use href="#pencil-square"></use></svg>
                                                        </Link>
                                                        {/* حذف */}
                                                        <button className="p-2 text-gray-400 hover:text-(--primaryColor) hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="حذف محصول">
                                                            <svg className="w-5 h-5"><use href="#trash"></use></svg>
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