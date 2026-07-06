import Link from "next/link"
import Image from "next/image"

export default function OrdersPage() {
    // دیتای نمونه سفارشات خریدار
    const allOrders = [
        { id: "OR-8821", date: "۱۴۰۵/۰۳/۱۵", total: "۱۸,۵۰۰,۰۰۰", count: "۱ کالا", payment: "انلاین", status: "در حال پردازش", statusStyle: "bg-amber-50 text-amber-600" },
        { id: "OR-7410", date: "۱۴۰۴/۱۱/۰۲", total: "۴,۲۰۰,۰۰۰", count: "۳ کالا", payment: "آنلاین", status: "تحویل شده", statusStyle: "bg-emerald-50 text-emerald-600" },
        { id: "OR-6302", date: "۱۴۰۴/۰۸/۲۲", total: "۸۵۰,۰۰۰", count: "۲ کالا", payment: "کارت به کارت", status: "لغو شده", statusStyle: "bg-rose-50 text-rose-600" }
    ];

    return (
        <>
            <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-semibold" dir="rtl">         
                
                {/* سایدبار خریدار */}
                <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/20">
                            <Image src='/images/admin.jpg' fill alt="تصویر کاربر" className="object-cover rounded-full" />
                        </div>
                        <div>
                            <h2 className="font-black text-gray-900 text-base">میثاق باباخانی</h2>
                            <span className=" font-bold text-gray-400 block mt-1">به پنل کاربری خوش آمدید!</span>
                        </div>
                    </div>

                    <nav className="mt-6 flex-1">
                        <ul className="flex flex-col gap-2">
                            {[
                                { label: 'میز کار', icon: '#squares-2x2', href: '/profile' },
                                { label: 'سفارش ها', icon: '#shopping-bag', href: '/profile/orders', active: true },
                                { label: 'لیست های من', icon: '#heart', href: '/profile/lists' },
                                { label: 'آدرس ها', icon: '#building-library', href: '/profile/addresses' },
                                { label: 'اطلاعات حساب کاربری', icon: '#identification', href: '/profile/personal-info' },
                                { label: 'خروج از حساب کاربری', icon: '#arrow-left-start-on-rectangle', href: '/' }
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
            
                {/* بخش اصلی سفارش‌ها */}
                <div className="flex-1 flex flex-col gap-6">
                    
                    {/* دیو اول: فیلترها و ناوبری وضعیت سفارشات */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 space-y-5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-50 pb-4">
                            <h1 className="text-xl font-black text-gray-900">مدیریت سفارش‌ها</h1>
                            
                            {/* باکس جستجوی فاکتور */}
                            <div className="w-full md:w-72 relative">
                                <input 
                                    type="text" 
                                    placeholder="جستجوی کد سفارش..." 
                                    className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 outline-none  transition-all focus:border-[#D92F4E] focus:bg-white"
                                />
                                <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <use href="#searchIcon"></use>
                                </svg>
                            </div>
                        </div>

                        {/* تب‌های تفکیک وضعیت بر اساس استایل دکمه‌های مینی‌مال */}
                        <div className="flex flex-wrap gap-2 ">
                            <button className="bg-[#D92F4E] text-white px-4 py-2.5 rounded-xl font-bold shadow-md shadow-[#D92F4E]/10 cursor-pointer">همه خریدها</button>
                            <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-bold transition-colors cursor-pointer">جاری (در حال پردازش)</button>
                            <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-bold transition-colors cursor-pointer">تحویل داده شده</button>
                            <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-bold transition-colors cursor-pointer">لغو شده</button>
                        </div>
                    </div>

                    {/* دیو دوم: جدول اصلی لیست سفارشات */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse ">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-400 font-bold border-b border-gray-100">
                                        <th className="p-4">کد سفارش</th>
                                        <th className="p-4">تاریخ ثبت سفارش</th>
                                        <th className="p-4">تعداد کالاها</th>
                                        <th className="p-4">مبلغ کل (تومان)</th>
                                        <th className="p-4">نوع پرداخت</th>
                                        <th className="p-4 text-center">وضعیت سفارش</th>
                                        <th className="p-4 text-center">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                                    {allOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="p-4 font-bold text-gray-900 font-mono ">{order.id}</td>
                                            <td className="p-4 text-gray-500 ">{order.date}</td>
                                            <td className="p-4 text-gray-600 ">{order.count}</td>
                                            <td className="p-4 text-gray-900 font-black">{order.total}</td>
                                            <td className="p-4 text-gray-500 ">{order.payment}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-3 py-1 rounded-full  font-bold ${order.statusStyle}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button className=" font-bold text-[#D92F4E] hover:bg-[#D92F4E]/5 border border-[#D92F4E]/20 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                                                    جزئیات فاکتور
                                                </button>
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