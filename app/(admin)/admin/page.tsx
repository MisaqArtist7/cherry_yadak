import Link from "next/link"
import Image from "next/image"

export default function AdminPage() {
    return (
        <>
        {/* هدر بالا (کاملاً هماهنگ با تم) */}
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

            <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-semibold" dir="rtl">         
                
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
                                { label: 'میز کار', icon: '#squares-2x2', href: '/admin', active: true },
                                { label: 'مدیریت محصولات', icon: '#building-storefront', href: '/admin/products/manage-products' },
                                { label: 'افزودن محصول جدید', icon: '#plus-circle', href: '/admin/products/create' },
                                { label: 'افزودن دسته‌بندی', icon: '#tag', href: '/admin/products/category' },
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
                </aside>
            
                {/* بخش فرم اصلی دسته‌بندی */}
                <div className="flex-1 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-8 border border-gray-100">
                    <div className="mb-8 pb-4 border-b border-gray-50 flex justify-between items-center">
                        <h1 className="text-xl font-black text-gray-900">میز کار ادمین</h1>
                        <span className=" font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md">خوش آمدید میثاق عزیز</span>
                    </div>
                    
                    <div className="max-w-4xl mx-auto space-y-8">
                        
                        {/* بخش اول: باکس‌های آمار سریع */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: "کل محصولات", value: "۱۴۸ مورد", color: "text-blue-600", bg: "bg-blue-50", icon: "#building-storefront" },
                                { label: "دسته‌بندی‌ها", value: "۱۲ دسته", color: "text-purple-600", bg: "bg-purple-50", icon: "#tag" },
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