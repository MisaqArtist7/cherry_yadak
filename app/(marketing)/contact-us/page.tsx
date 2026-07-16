import React from 'react';

export default function ContactUsPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-12 font-semibold" dir="rtl">
            <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
                
                {/* هدر صفحه */}
                <div className="bg-white rounded-3xl space-y-3 p-6 sm:p-8 md:p-10 border border-zinc-100 shadow-sm shadow-gray-200">
                    <div className="inline-flex items-center gap-2 bg-[#D92F4E]/10 text-[#D92F4E] px-3.5 py-1.5 rounded-xl text-sm sm:text-base font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#D92F4E]"></span>
                        آشنایی با چری یدک
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug sm:leading-tight">
                        پل‌های ارتباطی جهت مشاوره خرید قطعات، پیگیری سفارشات و پشتیبانی فنی
                    </h1>
                </div>

                {/* چیدمان متوازن دو ستونه (بدون فرم) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    
                    {/* باکس مشخصات تماس فیزیکی */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-100 shadow-sm shadow-gray-200 space-y-6 flex flex-col justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-4 text-lg">
                                اطلاعات تماس و دفتر مرکزی
                            </h2>
                            
                            {/* آدرس */}
                            <div className="space-y-2 mt-4">
                                <span className="text-gray-500 font-bold text-sm sm:text-base block">نشانی دفتر فروش:</span>
                                <p className="text-gray-700 leading-7 font-bold text-sm sm:text-base">
                                    تهران، پونک، خیابان مخبری، پلاک ۴۵، طبقه ۳، واحد ۶
                                </p>
                            </div>

                            {/* تلفن‌ها */}
                            <div className="space-y-2 border-t border-gray-100 pt-4 mt-4">
                                <span className="text-gray-500 font-bold text-sm sm:text-base block">تلفن‌های ثابت کارگاه و دفتر:</span>
                                <div className="space-y-3 text-gray-800" dir="ltr">
                                    <p className="flex justify-between sm:justify-end gap-3 font-bold text-sm sm:text-base">
                                        <span className="text-gray-500 font-bold order-2 sm:order-1">(بخش فروش)</span>
                                        <span className="order-1 sm:order-2">۰۲۱-۴۴۵۵۶۶۷۷</span>
                                    </p>
                                    <p className="flex justify-between sm:justify-end gap-3 font-bold text-sm sm:text-base">
                                        <span className="text-gray-500 font-bold order-2 sm:order-1">(پشتیبانی فنی)</span>
                                        <span className="order-1 sm:order-2">۰۲۱-۴۴۵۵۶۶۷۸</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ایمیل */}
                        <div className="space-y-2 border-t border-gray-100 pt-4 mt-4">
                            <span className="text-gray-500 font-bold text-sm sm:text-base block">پست الکترونیک:</span>
                            <p className="text-gray-800 text-right font-bold text-sm sm:text-base" dir="ltr">
                                info@cheryyadak.com
                            </p>
                        </div>
                    </div>

                    {/* باکس ساعات کاری */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-100 shadow-sm shadow-gray-200 space-y-5 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold border-b border-gray-100 pb-4 flex items-center gap-2 text-[#D92F4E] text-base sm:text-lg">
                                <span className="flex justify-center items-center h-4 w-4 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                                </span>
                                ساعات پاسخگویی چری یدک
                            </h3>
                            
                            <div className="space-y-4 text-gray-700 font-bold text-sm sm:text-base mt-6">
                                <div className="flex justify-between items-center gap-4">
                                    <span>شنبه تا چهارشنبه:</span> 
                                    <span className="text-gray-900 bg-gray-50 px-3 py-1.5 rounded-xl whitespace-nowrap">۸:۰۰ الی ۱۷:۰۰</span>
                                </div>
                                <div className="flex justify-between items-center gap-4">
                                    <span>پنجشنبه‌ها:</span> 
                                    <span className="text-gray-900 bg-gray-50 px-3 py-1.5 rounded-xl whitespace-nowrap">۸:۰۰ الی ۱۳:۰۰</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-4 text-gray-500 border-t border-gray-100 pt-4 mt-6">
                            <span>جمعه‌ها و ایام تعطیل:</span> 
                            <span className="bg-red-50 text-[#D92F4E]/80 px-3 py-1.5 rounded-xl text-xs sm:text-sm whitespace-nowrap font-bold">
                                تعطیل (پشتیبانی سایت)
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}