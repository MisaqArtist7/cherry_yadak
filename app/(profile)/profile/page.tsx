import Link from "next/link"
import Image from "next/image"

export default function ProfileDashboard() {
    // خلاصه دیتای آخرین سفارش برای نمایش سریع در میز کار
    const latestOrdersSample = [
        { id: "OR-8821", date: "۱۴۰۵/۰۳/۱۵", total: "۱۸,۵۰۰,۰۰۰", status: "در حال پردازش", statusStyle: "bg-amber-50 text-amber-600" },
        { id: "OR-7410", date: "۱۴۰۴/۱۱/۰۲", total: "۴,۲۰۰,۰۰۰", status: "تحویل شده", statusStyle: "bg-emerald-50 text-emerald-600" }
    ];

    // اطلاعات کاربری و آدرس اصلی
    const customerSummary = {
        name: "میثاق باباخانی",
        phone: "۰۹۱۲۳۴۵۶۷۸۹",
        email: "misagh@example.com",
        mainAddress: "تهران، پونک، خیابان مخبری، پلاک ۴۵، طبقه ۳، واحد ۶"
    };

    return (
        <>
            <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-medium">         
                
                {/* سایدبار مشتری */}
                <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/20">
                            <Image src='/images/admin.jpg' fill alt="تصویر پروفایل مشتری" className="object-cover rounded-full" />
                        </div>
                        <div>
                            <h2 className="font-black text-gray-900 text-base">میثاق باباخانی</h2>
                            <span className=" font-bold text-gray-400 block mt-1">به پنل کاربری خوش آمدید!</span>
                        </div>
                    </div>

                    <nav className="mt-6 flex-1">
                        <ul className="flex flex-col gap-2">
                            {[
                                { label: 'میز کار', icon: '#squares-2x2', href: '/profile', active: true },
                                { label: 'سفارش ها', icon: '#shopping-bag', href: '/profile/orders' },
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
            
                {/* بخش اصلی میز کار */}
                <div className="flex-1 flex flex-col gap-6">
                    
                    {/* ردیف اول: آمار کلی و خوش‌آمد گویی سریع */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white border border-gray-100 rounded-3xl p-5 flex flex-col justify-center shadow-sm shadow-gray-200/40">
                            <span className=" text-gray-400 block mb-1">خوش‌آمدید حجی!</span>
                            <h1 className="text-base font-black text-gray-900">{customerSummary.name}</h1>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center justify-between shadow-sm shadow-gray-200/40">
                            <span className=" text-gray-500 font-bold">سفارش‌های در جریان:</span>
                            <span className=" font-black px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600">۱ سفارش</span>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center justify-between shadow-sm shadow-gray-200/40">
                            <span className=" text-gray-500 font-bold">کل خریدهای موفق:</span>
                            <span className=" font-black px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600">۱ سفارش</span>
                        </div>
                    </div>

                    {/* ردیف دوم: جدول آخرین سفارش‌ها به صورت تمام‌عرض */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl border border-gray-100 overflow-hidden w-full">
                        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h2 className="font-black text-gray-900 ">آخرین سفارش‌های من</h2>
                            <Link href="/profile/orders" className=" text-[#D92F4E] hover:underline">مشاهده همه سفارش‌ها</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse ">
                                <thead>
                                    <tr className="bg-gray-50/30 text-gray-400 font-bold border-b border-gray-100 ">
                                        <th className="p-4">کد سفارش</th>
                                        <th className="p-4">تاریخ ثبت</th>
                                        <th className="p-4">مبلغ کل (تومان)</th>
                                        <th className="p-4 text-center">وضعیت ارسال</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
                                    {latestOrdersSample.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 font-bold text-gray-900 font-mono">{order.id}</td>
                                            <td className="p-4 ">{order.date}</td>
                                            <td className="p-4 text-gray-900 font-black">{order.total}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-3 py-1 rounded-full  font-bold ${order.statusStyle}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ردیف سوم: دو باکس خلاصه اطلاعات کاربری و آدرس در کنار هم */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* باکس اطلاعات حساب کاربری */}
                        <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 space-y-4 flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                                <h3 className="font-black text-gray-900  flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D92F4E]"></span>
                                    اطلاعات حساب مشتری
                                </h3>
                                <Link href="/profile/personal-info" className=" text-gray-400 hover:text-black">ویرایش مشخصات</Link>
                            </div>
                            <div className=" space-y-3 py-1">
                                <p className="text-gray-600"><span className="text-gray-400 ml-2 font-bold">تلفن همراه:</span><span className="font-mono text-gray-900 font-bold">{customerSummary.phone}</span></p>
                                <p className="text-gray-600"><span className="text-gray-400 ml-2 font-bold">آدرس ایمیل:</span><span className="font-mono text-gray-900 font-bold">{customerSummary.email}</span></p>
                            </div>
                        </div>

                        {/* باکس نشانی پیش‌فرض ارسال بار */}
                        <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 space-y-4 flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                                <h3 className="font-black text-gray-900  flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D92F4E]"></span>
                                    نشانی اصلی تحویل بار
                                </h3>
                                <Link href="/profile/addresses" className=" text-gray-400 hover:text-black">مدیریت آدرس‌ها</Link>
                            </div>
                            <div className="py-1">
                                <p className=" text-gray-600 leading-6 font-medium line-clamp-2">
                                    {customerSummary.mainAddress}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}