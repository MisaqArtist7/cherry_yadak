import Link from "next/link"
import Image from "next/image"

export default function UserPage() {
    // دیتای نمونه کاربران برای رندر شدن در جدول
    const usersSample = [
        { id: 1, name: "میثاق باباخانی", contact: "۰۹۱۲۳۴۵۶۷۸۹", email: "misagh@example.com", role: "مدیر کل", roleStyle: "bg-red-50 text-[#D92F4E]", date: "۱۴۰۲/۰۴/۱2", status: "فعال", statusStyle: "bg-emerald-50 text-emerald-600" },
        { id: 2, name: "علیرضا احمدی", contact: "۰۹۱۸۷۶۵۴۳۲۱", email: "alireza@example.com", role: "مشتری", roleStyle: "bg-gray-100 text-gray-600", date: "۱۴۰۵/۰۱/۲۰", status: "فعال", statusStyle: "bg-emerald-50 text-emerald-600" },
        { id: 3, name: "رضا محمدی", contact: "۰۹۳۵۱۱۱۲۲۳۳", email: "reza@example.com", role: "مشتری", roleStyle: "bg-gray-100 text-gray-600", date: "۱۴۰۵/۰۳/۰۵", status: "مسدود شده", statusStyle: "bg-rose-50 text-rose-600" }
    ];

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
                                { label: 'میز کار', icon: '#squares-2x2', href: '/admin' },
                                { label: 'مدیریت محصولات', icon: '#building-storefront', href: '/admin/products/manage-products' },
                                { label: 'افزودن محصول جدید', icon: '#plus-circle', href: '/admin/products/create' },
                                { label: 'افزودن دسته‌بندی', icon: '#tag', href: '/admin/products/category' },
                                { label: 'لیست کاربران', icon: '#users', href: '/admin/users', active: true }
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
            
                {/* بخش فرم اصلی مدیریت کاربران */}
                <div className="flex-1 flex flex-col gap-6">
                    
                    {/* دیو اول: فیلترها و سرچ کاربران */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="w-full sm:max-w-md relative">
                            <input 
                                type="search" 
                                placeholder="جستجوی کاربر بر اساس نام، شماره یا ایمیل..." 
                                className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-3 outline-none  transition-all focus:border-[#D92F4E] focus:bg-white focus:ring-4 focus:ring-[#D92F4E]/10"
                            />
                            <svg className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <use href="#searchIcon"></use>
                            </svg>
                        </div>

                        <div className="w-full sm:w-48">
                            <select className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3  font-bold text-gray-600 outline-none focus:bg-white focus:border-[#D92F4E] transition-all cursor-pointer">
                                <option value="">همه نقش‌ها</option>
                                <option value="admin">مدیران</option>
                                <option value="customer">مشتریان عادی</option>
                            </select>
                        </div>
                    </div>

                    {/* دیو دوم: جدول لیست کاربران */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h2 className="font-black text-gray-900 text-base">لیست کاربران ثبت نام شده</h2>
                            <span className=" font-bold text-[#D92F4E] bg-[#D92F4E]/10 px-3 py-1.5 rounded-xl">کل کاربران: ۱,۲۴۰ نفر</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse ">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-400 font-bold border-b border-gray-100">
                                        <th className="p-4">نام و نام خانوادگی</th>
                                        <th className="p-4">شماره تماس</th>
                                        <th className="p-4">ایمیل</th>
                                        <th className="p-4 text-center">نقش کاربری</th>
                                        <th className="p-4 text-center">تاریخ عضویت</th>
                                        <th className="p-4 text-center">وضعیت حساب</th>
                                        <th className="p-4 text-center">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                                    {usersSample.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="p-4 font-bold text-gray-900">{user.name}</td>
                                            <td className="p-4 font-mono text-gray-600" dir="ltr">{user.contact}</td>
                                            <td className="p-4 text-gray-500 font-mono">{user.email}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-md  font-bold ${user.roleStyle}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center text-gray-500">{user.date}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full  font-bold ${user.statusStyle}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* دکمه مسدود کردن یا شبیه به آن */}
                                                    <button className="p-2 text-gray-400 hover:text-[#D92F4E] hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="تغییر وضعیت وضعیت / مسدود سازی">
                                                        <svg className="w-5 h-5"><use href="#minus-circle"></use></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}