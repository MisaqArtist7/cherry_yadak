import Link from "next/link"
import Image from "next/image"

export default function PersonalInfoPage() {
    return (
        <>
            <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-semibold" dir="rtl">         
                
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
                                { label: 'میز کار', icon: '#squares-2x2', href: '/profile' },
                                { label: 'سفارش ها', icon: '#shopping-bag', href: '/profile/orders' },
                                { label: 'لیست های من', icon: '#heart', href: '/profile/lists' },
                                { label: 'آدرس ها', icon: '#building-library', href: '/profile/addresses' },
                                { label: 'اطلاعات حساب کاربری', icon: '#identification', href: '/profile/personal-info', active: true },
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
            
                {/* بخش اصلی اطلاعات کاربری */}
                <div className="flex-1 flex flex-col gap-6">
                    
                    {/* دیو اول: اطلاعات فردی و تماس */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 md:p-8 border border-gray-100">
                        <div className="mb-6 pb-4 border-b border-gray-50">
                            <h1 className="text-xl font-black text-gray-900">اطلاعات حساب کاربری</h1>
                            <p className=" text-gray-400 mt-1 font-medium">مشخصات فردی و اطلاعات تماس خود را ویرایش کنید</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* نام و نام خانوادگی */}
                                <div className="space-y-2">
                                    <label className=" font-bold text-gray-500 block">نام و نام خانوادگی</label>
                                    <input 
                                        type="text" 
                                        defaultValue="میثاق باباخانی" 
                                        className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none  transition-all focus:bg-white focus:border-[#D92F4E]"
                                    />
                                </div>

                                {/* شماره تلفن همراه (معمولاً قفل است) */}
                                <div className="space-y-2 relative">
                                    <label className=" font-bold text-gray-400 block">شماره تلفن همراه (غیرقابل تغییر)</label>
                                    <input 
                                        type="text" 
                                        disabled
                                        defaultValue="۰۹۱۲۳۴۵۶۷۸۹" 
                                        className="w-full font-mono bg-gray-100/70 border border-gray-200 rounded-xl px-4 py-3 outline-none  text-gray-400 cursor-not-allowed" 
                                        dir="ltr"
                                    />
                                </div>

                                {/* آدرس ایمیل */}
                                <div className="space-y-2">
                                    <label className=" font-bold text-gray-500 block">آدرس ایمیل</label>
                                    <input 
                                        type="email" 
                                        defaultValue="misagh@example.com" 
                                        className="w-full font-mono bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none  transition-all focus:bg-white focus:border-[#D92F4E]" 
                                        dir="ltr"
                                    />
                                </div>

                                {/* کد ملی یا کد اقتصادی شرکت */}
                                <div className="space-y-2">
                                    <label className=" font-bold text-gray-500 block">کد ملی / شناسه اقتصادی</label>
                                    <input 
                                        type="text" 
                                        placeholder="جهت صدور فاکتور رسمی وارد کنید..." 
                                        className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none  transition-all focus:bg-white focus:border-[#D92F4E]"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button type="button" className="bg-[#D92F4E] text-white px-6 py-3 rounded-xl  font-bold hover:bg-[#b8253f] transition-colors shadow-md shadow-[#D92F4E]/10 cursor-pointer">
                                    ثبت و بروزرسانی مشخصات
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* دیو دوم: تغییر رمز عبور */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 md:p-8 border border-gray-100">
                        <div className="mb-6 pb-4 border-b border-gray-50">
                            <h2 className="text-base font-black text-gray-900">تغییر رمز عبور حساب</h2>
                            <p className=" text-gray-400 mt-1 font-medium">برای حفظ امنیت حساب خود، رمز عبور پیچیده انتخاب کنید</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* رمز عبور فعلی */}
                                <div className="space-y-2">
                                    <label className=" font-bold text-gray-500 block">رمز عبور فعلی</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none  transition-all focus:bg-white focus:border-[#D92F4E]"
                                    />
                                </div>

                                {/* رمز عبور جدید */}
                                <div className="space-y-2">
                                    <label className=" font-bold text-gray-500 block">رمز عبور جدید</label>
                                    <input 
                                        type="password" 
                                        placeholder="حداقل ۸ کاراکتر..." 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none  transition-all focus:bg-white focus:border-[#D92F4E]"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button type="button" className="border border-gray-200 hover:border-[#D92F4E] hover:text-[#D92F4E] text-gray-600 px-6 py-3 rounded-xl  font-bold transition-all cursor-pointer">
                                    تغییر رمز عبور
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            </section>
        </>
    )
}