import prisma from "@/lib/prisma";
export default async function UserPage() {

    const users = await prisma.user.findMany()

    const usersSample = [
        { id: 1, name: "میثاق باباخانی", contact: "۰۹۱۲۳۴۵۶۷۸۹", email: "misagh@example.com", role: "مدیر کل", roleStyle: "bg-red-50 text-[#D92F4E]", date: "۱۴۰۲/۰۴/۱2", status: "فعال", statusStyle: "bg-emerald-50 text-emerald-700" },
        { id: 2, name: "علیرضا احمدی", contact: "۰۹۱۸۷۶۵۴۳۲۱", email: "alireza@example.com", role: "مشتری", roleStyle: "bg-gray-100 text-gray-600", date: "۱۴۰۵/۰۱/۲۰", status: "فعال", statusStyle: "bg-emerald-50 text-emerald-700" },
        { id: 3, name: "رضا محمدی", contact: "۰۹۳۵۱۱۱۲۲۳۳", email: "reza@example.com", role: "مشتری", roleStyle: "bg-gray-100 text-gray-600", date: "۱۴۰۵/۰۳/۰۵", status: "مسدود شده", statusStyle: "bg-rose-50 text-rose-600" }
    ];

    return (
        <>

            {/* اضافه کردن lg:gap-8 و مدیریت پدینگ‌ها برای موبایل */}
            <section className="min-h-screen bg-gray-50/50 flex gap-4 lg:gap-8 p-4 md:p-8" dir="rtl">         

                {/* بخش اصلی */}
                <div className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full overflow-hidden">
                    
                    {/* هدر صفحه و دکمه همبرگری در موبایل */}
                    <div className="flex items-center justify-between lg:block">
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">مدیریت کاربران</h1>
                            <p className=" md: text-gray-500 mt-1">مشاهده مشخصات، مدیریت نقش‌ها و تعیین وضعیت دسترسی کاربران سایت</p>
                        </div>
                        
                        {/* دکمه همبرگری که فقط در موبایل و تبلت دیده می‌شود */}
                        <button 
                            className="lg:hidden p-3 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm hover:bg-gray-50"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* کارت‌های آمار سریع کاربران (ریسپانسیو شده با grid-cols-1 sm:grid-cols-2 lg:grid-cols-3) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                            <div className="p-3.5 bg-red-50 text-[#D92F4E] rounded-xl">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                            <div>
                                <span className="block  md: text-gray-400 font-medium">کل کاربران</span>
                                <span className="text-lg md:text-xl font-black text-gray-900">۱,۲۴۰ نفر</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <span className="block  md: text-gray-400 font-medium">کاربران فعال</span>
                                <span className="text-lg md:text-xl font-black text-emerald-600">۱,۲۲۵ نفر</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm sm:col-span-2 lg:col-span-1">
                            <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                            </div>
                            <div>
                                <span className="block  md: text-gray-400 font-medium">حساب‌های مسدود</span>
                                <span className="text-lg md:text-xl font-black text-rose-600">۱۵ کاربر</span>
                            </div>
                        </div>
                    </div>

                    {/* فیلترها و سرچ کاربران */}
                    <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:max-w-md relative">
                            <input 
                                type="search" 
                                placeholder="جستجوی کاربر بر اساس نام، شماره یا ایمیل..." 
                                className="w-full font-medium bg-gray-50 border border-gray-200/80 rounded-xl pr-11 pl-4 py-3 outline-none transition-all focus:border-[#D92F4E] focus:bg-white focus:ring-4 focus:ring-[#D92F4E]/5  text-gray-800 placeholder-gray-400"
                            />
                            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="w-full md:w-48">
                            <select className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 font-bold text-gray-600  outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/5 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a0aec0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[position:left_14px_center] bg-no-repeat pl-10">
                                <option value="">همه نقش‌ها</option>
                                <option value="admin">مدیران</option>
                                <option value="customer">مشتریان عادی</option>
                            </select>
                        </div>
                    </div>

                    {/* جدول لیست کاربران (با ساختار اسکرول افقی ایمن برای موبایل) */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto block w-full vertical-scrollbar-fix">
                            <table className="w-full text-right border-collapse min-w-200">
                                <thead>
                                    <tr className="bg-gray-50/70 text-gray-500 font-bold  uppercase tracking-wider border-b border-gray-100">
                                        <th className="p-4 min-w-40">نام و نام خانوادگی</th>
                                        <th className="p-4">شماره تماس</th>
                                        <th className="p-4 text-center">نقش کاربری</th>
                                        <th className="p-4 text-center">تاریخ عضویت</th>
                                        <th className="p-4 text-center">وضعیت حساب</th>
                                        <th className="p-4 text-center w-28">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 font-medium  text-gray-600">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/40 transition-colors group">
                                            <td className="p-4 font-bold text-gray-900">{user.fullName}</td>
                                            <td className="p-4 font-mono  text-gray-600 tracking-wider" dir="ltr">{user.phone}</td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-block px-2.5 py-1 rounded-lg  font-bold ${user.role}`}>
                                                    {user.role === 'ADMIN' ? 'ادمین' : 'مهمان' }
                                                </span>
                                            </td>
                                            <td className="p-4 text-center text-gray-400  font-semibold">
                                                {new Intl.DateTimeFormat("fa-IR", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }).format(user.createdAt)}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full  font-bold ${user.isVerified}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${user.isVerified === true ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                                    {user.isVerified ? 'فعال' : 'غیر فعال'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button className="p-2 text-gray-400 hover:text-[#D92F4E] hover:bg-red-50 rounded-xl transition-all cursor-pointer" title="تغییر وضعیت دسترسی / مسدود سازی">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
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