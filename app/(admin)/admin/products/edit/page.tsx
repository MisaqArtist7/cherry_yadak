import Link from "next/link"
import Image from "next/image"

export default function EditProductPage() {
    // این دیتا به عنوان نمونه فرضی از دیتابیس لود شده تا فرم خالی نباشه
    const currentProduct = {
        name: "اسپیندل موتور خنک‌کننده هوا 2.2 کیلووات",
        price: "18500000",
        discount: "5",
        category: "parts",
        stock: "5",
        brand: "HQD",
        image: "/images/admin.jpg", // تصویر فعلی محصول
        description: "این اسپیندل موتور با توان ۲.۲ کیلووات و بلبرینگ‌های سرامیکی اورجینال، گزینه‌ای ایده‌آل برای دستگاه‌های سی‌ان‌سی چوب و سنگ به شمار می‌رود."
    }

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
                                className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 outline-none text-sm transition-all focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10"
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
            <section className="min-h-screen flex gap-8 p-6 md:p-8 font-semibold" dir="rtl">         
                
                {/* سایدبار ادمین */}
                <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/20">
                            <Image src='/images/admin.jpg' fill alt="تصویر ادمین" className="object-cover rounded-full" />
                        </div>
                        <div>
                            <h2 className="font-black text-gray-900 text-base">میثاق باباخانی</h2>
                            <span className="text-xs font-bold text-gray-400 block mt-1">مدیر کل مجموعه</span>
                        </div>
                    </div>

                    <nav className="mt-6 flex-1">
                        <ul className="flex flex-col gap-2">
                            {[
                                { label: 'میز کار', icon: '#squares-2x2', href: '/admin'},
                                { label: 'مدیریت محصولات', icon: '#building-storefront', href: '/admin/products/manage-products', active: true  },
                                { label: 'افزودن محصول جدید', icon: '#plus-circle', href: '/admin/products/create' },
                                { label: 'افزودن دسته‌بندی', icon: '#tag', href: '/admin/products/category' },
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={item.href} 
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group ${
                                            item.active 
                                            ? 'bg-[#D92F4E] text-white shadow-lg shadow-[#D92F4E]/20' 
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
            
                {/* بخش فرم اصلی ویرایش محصول */}
                <div className="flex-1 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-8 border border-gray-100">
                    <div className="mb-8 pb-4 border-b border-gray-50 flex justify-between items-center">
                        <h1 className="text-xl font-black text-gray-900">ویرایش محصول نهایی</h1>
                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md">شناسه محصول: #۱۲۸۴</span>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <form className="space-y-6">
                            
                            {/* ردیف ۱: نام محصول و برند (دو ستونه) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-2 text-gray-700">نام محصول</label>
                                    <input
                                        type="text"
                                        defaultValue={currentProduct.name}
                                        placeholder="نام محصول را وارد کنید"
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 text-sm outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">برند محصول</label>
                                    <input
                                        type="text"
                                        defaultValue={currentProduct.brand}
                                        placeholder="مثلاً: HQD"
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 text-sm outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* ردیف ۲: قیمت و تخفیف (دو ستونه) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">قیمت (تومان)</label>
                                    <input
                                        type="number"
                                        defaultValue={currentProduct.price}
                                        placeholder="قیمت جدید"
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 text-sm outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">تخفیف (درصد)</label>
                                    <input
                                        type="number"
                                        defaultValue={currentProduct.discount}
                                        placeholder="میزان تخفیف"
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 text-sm outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* ردیف ۳: دسته‌بندی و موجودی (دو ستونه) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">دسته‌بندی</label>
                                    <select 
                                        defaultValue={currentProduct.category}
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 text-sm outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all appearance-none cursor-pointer font-medium"
                                    >
                                        <option value="">انتخاب کنید</option>
                                        <option value="cnc">دستگاه CNC</option>
                                        <option value="parts">قطعات یدکی</option>
                                        <option value="tools">ابزارآلات برش</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">موجودی انبار</label>
                                    <input
                                        type="number"
                                        defaultValue={currentProduct.stock}
                                        placeholder="تعداد موجودی"
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 text-sm outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* ردیف ۴: بخش آپلود و مدیریت عکس محصول فعلی */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">تصویر محصول</label>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                                    
                                    {/* نمایش مینی‌مال تصویر فعلی محصول */}
                                    <div className="relative h-32 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 text-center">
                                        <Image src={currentProduct.image} fill className="object-cover opacity-70" alt="عکس فعلی" />
                                        <span className="absolute bottom-2 bg-black/60 text-[10px] text-white font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">تصویر فعلی</span>
                                    </div>

                                    {/* داک آپلود تصویر جدید */}
                                    <div className="sm:col-span-3 border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center bg-gray-50/20 hover:bg-gray-50 hover:border-[#D92F4E]/40 transition-all cursor-pointer group">
                                        <svg className="w-8 h-8 text-gray-400 group-hover:text-[#D92F4E] transition-colors mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-xs font-bold text-gray-500 group-hover:text-[#D92F4E] transition-colors">برای بارگذاری تصویر جدید کلیک کنید</span>
                                    </div>
                                </div>
                            </div>

                            {/* ردیف ۵: توضیحات فنی */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">توضیحات فنی و اجمالی</label>
                                <textarea
                                    rows={5}
                                    defaultValue={currentProduct.description}
                                    placeholder="مشخصات محصول..."
                                    className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 text-sm outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all resize-none font-medium leading-6"
                                />
                            </div>

                            {/* ردیف ۶: دکمه‌های عملیات ثبت یا لغو */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                                <Link 
                                    href="/admin/products/manage-products"
                                    className="px-6 py-3.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer"
                                >
                                    انصراف
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-[#D92F4E] text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 cursor-pointer"
                                >
                                    ذخیره تغییرات محصول
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </section>
        </>
    )
}