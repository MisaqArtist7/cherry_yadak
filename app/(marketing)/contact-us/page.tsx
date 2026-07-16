export default function ContactUsPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-6 md:p-12 font-semibold" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-10"> {/* بزرگ‌تر کردن عرض کل باکس اصلی */}
                
                {/* هدر صفحه */}
                <div className="bg-white rounded-4xl space-y-3 p-8 md:p-10 border border-zinc-100 shadow shadow-gray-200">
                    <div className="inline-flex items-center gap-2 bg-[#D92F4E]/10 text-[#D92F4E] px-4 py-2 rounded-xl font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#D92F4E]"></span>
                        آشنایی با البرز سی‌ان‌سی
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">پل‌های ارتباطی جهت مشاوره خرید قطعات، پیگیری سفارشات و پشتیبانی فنی</h1>
                </div>

                {/* چیدمان دو ستونه محتوا */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    
                    {/* ستون راست (فرم ارسال پیام بزرگ‌تر) - ۳ بخش از ۵ بخش */}
                    <div className="lg:col-span-3 bg-white rounded-4xl p-8 md:p-10 border border-zinc-100 shadow shadow-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2.5">
                            <svg className="w-6 h-6 text-[#D92F4E]"><use href="#envelope-icon"></use></svg>
                            ارسال پیام مستقیم برای مدیریت یا بخش فروش
                        </h2>

                        <form className="space-y-6 "> {/* بزرگ‌تر شدن فونت فرم به تکست sm */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2.5">
                                    <label className="text-gray-500 font-bold block ">نام و نام خانوادگی:</label>
                                    <input 
                                        type="text" 
                                        placeholder="مثال: میثاق باباخانی"
                                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none  transition-all focus:bg-white focus:border-[#D92F4E]"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-gray-500 font-bold block ">شماره تلفن همراه:</label>
                                    <input 
                                        type="text" 
                                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                        className="w-full  bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none  transition-all focus:bg-white focus:border-[#D92F4E]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-gray-500 font-bold block ">موضوع پیام</label>
                                <input 
                                    type="text" 
                                    placeholder="مشاوره خرید اسپیندل، پیگیری فاکتور رسمی و..."
                                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none  transition-all focus:bg-white focus:border-[#D92F4E]"
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <button type="button" className="bg-[#D92F4E] text-white px-8 py-4 rounded-2xl  font-bold hover:bg-[#b8253f] transition-colors shadow-md shadow-[#D92F4E]/10 cursor-pointer">
                                    ارسال پیام به کارشناسان
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* ستون چپ (اطلاعات ارتباطی با تم کاملاً روشن و سایز بزرگ‌تر) - ۲ بخش از ۵ بخش */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        
                        {/* باکس مشخصات تماس فیزیکی */}
                        <div className="bg-white rounded-4xl p-8 border border-zinc-100 shadow shadow-gray-200 space-y-6 ">
                            <h2 className=" font-bold text-gray-900 border-b border-gray-50 pb-4">اطلاعات تماس و دفتر مرکزی</h2>
                            
                            {/* آدرس */}
                            <div className="space-y-2">
                                <span className="text-gray-500 font-bold block ">نشانی دفتر فروش:</span>
                                <p className="text-gray-700 leading-7 font-bold ">تهران، پونک، خیابان مخبری، پلاک ۴۵، طبقه ۳، واحد ۶</p>
                            </div>

                            {/* تلفن‌ها */}
                            <div className="space-y-2 border-t border-gray-50 pt-4">
                                <span className="text-gray-500 font-bold block ">تلفن‌های ثابت کارگاه و دفتر:</span>
                                <div className="space-y-2 text-gray-800  " dir="ltr">
                                    <p className="flex justify-end gap-2 font-bold">۰۲۱-۴۴۵۵۶۶۷۷ <span className="text-gray-500   font-bold">(بخش فروش)</span></p>
                                    <p className="flex justify-end gap-2 font-bold">۰۲۱-۴۴۵۵۶۶۷۸ <span className="text-gray-500   font-bold">(پشتیبانی فنی)</span></p>
                                </div>
                            </div>

                            {/* ایمیل */}
                            <div className="space-y-2 border-t border-gray-50 pt-4">
                                <span className="text-gray-500 font-bold block ">پست الکترونیک:</span>
                                <p className="text-gray-800   text-right font-bold" dir="ltr">info@alborzcnc.com</p>
                            </div>
                        </div>

                        {/* باکس ساعات کاری با تم کاملاً روشن و مینی‌مال */}
                        <div className="bg-white rounded-4xl p-8 border border-zinc-100 shadow shadow-gray-200 space-y-5 ">
                            <h3 className="font-bold  border-b border-gray-50 pb-4 flex items-center gap-2 text-[#D92F4E]">
                                <span className="flex justify-center items-center h-4 w-4 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                                </span>
                                ساعات پاسخگویی دیجی دوربین
                            </h3>
                            <div className="space-y-3.5 text-gray-700 font-bold  md:">
                                <p className="flex justify-between items-center"><span>شنبه تا چهارشنبه:</span> <span className=" text-gray-900 bg-gray-50 px-3 py-1.5 rounded-xl">۸:۰۰ الی ۱۷:۰۰</span></p>
                                <p className="flex justify-between items-center"><span>پنجشنبه‌ها:</span> <span className=" text-gray-900 bg-gray-50 px-3 py-1.5 rounded-xl">۸:۰۰ الی ۱۳:۰۰</span></p>
                                <p className="flex justify-between items-center text-gray-500"><span>جمعه‌ها و ایام تعطیل:</span> <span className="bg-red-50 text-[#D92F4E]/80 px-3 py-1.5 rounded-xl  ">تعطیل (پشتیبانی سایت)</span></p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    )
}