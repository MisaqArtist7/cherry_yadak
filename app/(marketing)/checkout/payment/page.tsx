'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
    // مدیریت روش پرداخت (پیش‌فرض: online)
    const [paymentMethod, setPaymentMethod] = useState('online');

    return (
        <section className="cart_section container mx-auto px-4 py-8 text-gray-800 antialiased">
            {/* کل ساختار: در دسکتاپ دو ستونه، در موبایل تک ستونه */}
            <div className="cart_wrapper flex flex-col lg:flex-row gap-6 items-start">
                
                {/* ستون راست: انتخاب روش پرداخت و خدمات جانبی */}
                <div className="w-full lg:flex-1 space-y-4">
                    
                    {/* هدر صفحه */}
                    <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between shadow-sm/5">
                        <h1 className="font-extrabold text-xl text-gray-900 tracking-tight">انتخاب روش پرداخت</h1>
                    </div>

                    {/* کانتینر روش‌های پرداخت (رادیو کارت‌های هوشمند و متصل به استیت) */}
                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-3">
                        
                        {/* گزینه اول: پرداخت آنلاین */}
                        <label 
                            onClick={() => setPaymentMethod('online')}
                            className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 select-none ${
                                paymentMethod === 'online' 
                                ? 'border-[#D92F4E] bg-red-50/20 shadow-md/5' 
                                : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm'
                            }`}
                        >
                            <input 
                                type="radio" 
                                name="payment_type"
                                checked={paymentMethod === 'online'}
                                onChange={() => setPaymentMethod('online')}
                                className="w-4 h-4 text-[#D92F4E] focus:ring-[#D92F4E] cursor-pointer accent-[#D92F4E]" 
                            />
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center justify-center p-3 rounded-xl transition-colors duration-300 ${paymentMethod === 'online' ? 'bg-red-50 text-[#D92F4E]' : 'bg-gray-50 text-gray-400'}`}>
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900 text-lg">پرداخت آنلاین</span>
                                    <span className="block text-gray-400 mt-1 font-medium ">شامل تمام کارت‌های عضو شتاب</span>
                                </div>
                            </div>
                        </label>

                        {/* گزینه دوم: پرداخت درب محل */}
                        <label 
                            onClick={() => setPaymentMethod('delivery')}
                            className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 select-none ${
                                paymentMethod === 'delivery' 
                                ? 'border-[#D92F4E] bg-red-50/20 shadow-md/5' 
                                : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm'
                            }`}
                        >
                            <input 
                                type="radio" 
                                name="payment_type"
                                checked={paymentMethod === 'delivery'}
                                onChange={() => setPaymentMethod('delivery')}
                                className="w-4 h-4 text-[#D92F4E] focus:ring-[#D92F4E] cursor-pointer accent-[#D92F4E]" 
                            />
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center justify-center p-3 rounded-xl transition-colors duration-300 ${paymentMethod === 'delivery' ? 'bg-red-50 text-[#D92F4E]' : 'bg-gray-50 text-gray-400'}`}>
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900 text-lg">پرداخت درب محل</span>
                                    <span className="block text-gray-400 mt-1 font-medium ">پرداخت با کارتخوان موقع تحویل محصول</span>
                                </div>
                            </div>
                        </label>

                    </div>

                    {/* باکس کد سفارش */}
                    <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between shadow-sm/5">
                        <h2 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
                            <span>کد سفارش:</span>
                            <span className="font-mono text-(--primaryColor) tracking-wider">۱۱۵۳۷۱۵۶۲۶</span>
                        </h2>
                    </div>

                    {/* بخش اطلاعات و مشخصات آدرس */}
                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-4">
                        {/* هدر کوچک بخش مشخصات */}
                        <div className="flex items-center gap-2 pb-3 border-b border-gray-50">
                            <svg className="w-5 h-5 text-[#D92F4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h3 className="font-black text-gray-900">مشخصات و آدرس تحویل</h3>
                        </div>

                        {/* اطلاعات به صورت گرید منظم */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                            <div className="flex items-center gap-2 bg-gray-50/60 p-4 rounded-xl border border-gray-100/50">
                                <span className="text-gray-500 font-medium shrink-0">نام گیرنده:</span>
                                <span className="font-bold text-gray-800">میثاق باباخانی</span>
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50/60 p-4 rounded-xl border border-gray-100/50">
                                <span className="text-gray-500 font-medium shrink-0">شماره تماس:</span>
                                <span className="font-bold text-gray-800 tracking-wide">۰۹۳۰۲۳۴۰۲۷۹</span>
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50/60 p-4 rounded-xl border border-gray-100/50">
                                <span className="text-gray-500 font-medium shrink-0">بازه تحویل:</span>
                                <span className="font-bold text-[#D92F4E]">۳ تا ۵ روز کاری</span>
                            </div>

                            {/* بخش آدرس (به صورت عرید در کل عرض گرید) */}
                            <div className="sm:col-span-2 flex items-start gap-2 bg-gray-50/60 p-4 rounded-xl border border-gray-100/50">
                                <span className="text-gray-500 font-medium shrink-0 mt-0.5">آدرس گیرنده:</span>
                                <span className="font-bold text-gray-800 leading-relaxed">
                                    تهران، بزرگراه فتح، نبش خیابان هفدهم، مجتمع صنعتی البرز، پلاک ۱۲، واحد ۴
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ستون چپ: فاکتور نهایی و جزئیات خرید */}
                <div className="w-full lg:w-110 shrink-0 bg-white border border-gray-100 rounded-xl p-5 shadow-sm lg:sticky lg:top-28 space-y-5">
                    <h2 className="font-extrabold text-gray-900 border-b border-gray-50 pb-3">
                        جزئیات خرید
                    </h2>
                    
                    {/* محاسبات قیمت */}
                    <div className="space-y-3.5">
                        <div className="flex items-center justify-between text-gray-500 ">
                            <span>قیمت کالاها (۱)</span>
                            <div className="flex items-center gap-1 font-bold text-gray-800">
                                <span>۴۱۰,۰۰۰,۰۰۰</span>
                                <svg className="w-3.5 h-3.5 text-gray-400 fill-current"><use href="#toman"></use></svg>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-gray-500 ">
                            <span>مجموع هزینه ارسال</span>
                            <div className="flex items-center gap-1 font-bold text-gray-800">
                                <span>۴۱۰,۰۰۰,۰۰۰</span>
                                <svg className="w-3.5 h-3.5 text-gray-400 fill-current"><use href="#toman"></use></svg>
                            </div>
                        </div>

                        <div className="border-t border-gray-50 pt-4 flex items-center justify-between font-black text-gray-900 text-lg">
                            <span>مجموع سبد خرید</span>
                            <div className="flex items-center gap-1 text-[#D92F4E]">
                                <span>۳۶۸,۸۸۸,۹۸۱</span>
                                <svg className="w-4 h-4 text-[#D92F4E] fill-current"><use href="#toman"></use></svg>
                            </div>
                        </div>
                    </div>

                    {/* دکمه نهایی ثبت سفارش / پرداخت */}
                    <Link 
                        href='/checkout/payment' 
                        className="w-full text-white py-3.5 rounded-xl font-bold bg-[#D92F4E] hover:bg-[#b8233f] shadow-lg shadow-[#D92F4E]/20 hover:shadow-[#D92F4E]/30 transition-all duration-300 cursor-pointer text-center block tracking-wide active:scale-95"
                    >
                        {paymentMethod === 'online' ? 'اتصال به درگاه و پرداخت' : 'ثبت نهایی و اتمام خرید'}
                    </Link>

                </div>

            </div>
        </section>
    );
}