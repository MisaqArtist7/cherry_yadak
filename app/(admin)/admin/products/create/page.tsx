import Link from "next/link"
import Image from "next/image"

export default function CreateProductPage() {
    return (
        <>
            {/* هدر بالا */}
                <header className="bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 py-4 sticky top-0 z-50" dir="rtl">
                <div className="flex items-center gap-6 grow">
                    <Link href="/">
                        <Image src='/images/logo.svg' width={140} height={45} alt="البرز سی‌ان‌سی" className="h-9 w-auto cursor-pointer"/>
                    </Link>
                    
                    <form action="" className="w-full max-w-xs relative hidden sm:block transition-all duration-300 ease-in-out focus-within:max-w-md">
                        <input 
                            type="search" 
                            placeholder="جستجو..." 
                            className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 outline-none  transition-all focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10"
                        />
                        <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <use href="#searchIcon"></use>
                        </svg>
                    </form>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button className="bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 p-2.5 text-gray-500 transition-colors cursor-pointer">
                        <svg className="w-5 h-5"><use href="#bell"></use></svg>
                    </button>
                    <button className="bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 p-2.5 text-gray-500 transition-colors cursor-pointer">
                        <svg className="w-5 h-5"><use href="#arrow-left-start-on-rectangle"></use></svg>
                    </button>
                </div>
            </header>

            <section className="min-h-screen flex gap-8 p-6 md:p-8 font-semibold">         
                
                {/* سایدبار ادمین */}
                <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/20">
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
                                { label: 'مدیریت محصولات', icon: '#building-storefront', href: '/admin/products/manage-products' },
                                { label: 'افزودن محصول جدید', icon: '#plus-circle', href: '/admin/products/create', active: true },
                                { label: 'افزودن دسته‌بندی', icon: '#tag', href: '/admin/products/category'},
                                { label: 'لیست کاربران', icon: '#users', href: '/admin/users' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={item.href} 
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl  font-bold transition-all duration-200 group ${
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
                    
                    <div className="pt-4 border-t border-gray-100">
                        <button className="w-full flex items-center justify-center gap-2 py-3  font-bold text-gray-400 hover:text-[#D92F4E] hover:bg-red-50 rounded-xl transition-colors cursor-pointer">
                            <svg className="w-5 h-5"><use href="#logout-icon"></use></svg>
                            <span>خروج از حساب</span>
                        </button>
                    </div>
                </aside>
            
                {/* بخش فرم اصلی (بزرگ‌تر و چند ستونه) */}
                <div className="flex-1 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-8 border border-gray-100">
                    <div className="mb-8 pb-4 border-b border-gray-50 flex justify-between items-center">
                        <h1 className="text-xl font-black text-gray-900">فروشگاه - افزودن محصول جدید</h1>
                        <span className=" font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md">مرحله ۱ از ۲</span>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <form className="space-y-6">
                            
                            {/* ردیف ۱: نام محصول (تک ستون) */}
                            <div>
                                <label className="block  font-bold mb-2 text-gray-700">نام محصول</label>
                                <input
                                    type="text"
                                    placeholder="مثلاً: دستگاه CNC مدل تک محور X1"
                                    className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5  outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all"
                                />
                            </div>

                            {/* ردیف ۲: قیمت و تخفیف (دو ستونه) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block  font-bold mb-2 text-gray-700">قیمت (تومان)</label>
                                    <input
                                        type="number"
                                        placeholder="مثلاً: 45000000"
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5  outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block  font-bold mb-2 text-gray-700">تخفیف (درصد یا مبلغ)</label>
                                    <input
                                        type="number"
                                        placeholder="مثلاً: 5"
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5  outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* ردیف ۳: دسته‌بندی و موجودی (دو ستونه) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block  font-bold mb-2 text-gray-700">دسته‌بندی</label>
                                    <select className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5  outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all appearance-none cursor-pointer">
                                        <option value="">انتخاب کنید</option>
                                        <option value="cnc">دستگاه CNC</option>
                                        <option value="parts">قطعات یدکی</option>
                                        <option value="tools">ابزارآلات برش</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block  font-bold mb-2 text-gray-700">موجودی انبار</label>
                                    <input
                                        type="number"
                                        placeholder="مثلاً: 12"
                                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5  outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* ردیف ۴: تصویر محصول (استایل مدرن آپلودر) */}
                            <div>
                                <label className="block  font-bold mb-2 text-gray-700">تصویر محصول</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 hover:border-[#D92F4E]/40 transition-all cursor-pointer group">
                                    <svg className="w-10 h-10 text-gray-400 group-hover:text-[#D92F4E] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className=" font-bold text-gray-500 group-hover:text-[#D92F4E] transition-colors">کلیک کنید یا تصویر را به این بخش بکشید</span>
                                    <span className="text-[10px] text-gray-400 mt-1">فرمت‌های مجاز: PNG, JPG, WEBP</span>
                                </div>
                            </div>

                            {/* ردیف ۵: توضیحات (تک ستون) */}
                            <div>
                                <label className="block  font-bold mb-2 text-gray-700">توضیحات فنی و اجمالی</label>
                                <textarea
                                    rows={5}
                                    placeholder="مشخصات موتور، ابعاد، توان مصرفی و..."
                                    className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5  outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all resize-none"
                                />
                            </div>

                            {/* ردیف ۶: دکمه ثبت (تراز شده به سمت چپ) */}
                            <div className="flex justify-end pt-4 border-t border-gray-50">
                                <button
                                    type="submit"
                                    className="bg-[#D92F4E] text-white px-8 py-3.5 rounded-xl  font-bold hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 cursor-pointer"
                                >
                                    ذخیره و ثبت محصول
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </section>
        </>
    )
}