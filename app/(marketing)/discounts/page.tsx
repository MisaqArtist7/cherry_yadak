'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function OfferPage() {
    // مدیریت تب‌های مرتب‌سازی بر اساس تم جدید
    const [sortBy, setSortBy] = useState('newest');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000000);
    // مدیریت وضعیت باز/بسته بودن دراپ‌داون‌ها
    const [openFilters, setOpenFilters] = useState({
        categories: false,
        brands: false,
        price: false,
    });

    // مدیریت سوئیچ کالا‌های موجود
    const [onlyAvailable, setOnlyAvailable] = useState(false);

    // تابع تغییر وضعیت باز و بسته شدن
    const toggleFilter = (section) => {
        setOpenFilters(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <section className="offer_section container mx-auto px-4 py-8 text-gray-800 antialiased">
            <div className="flex flex-col lg:flex-row gap-4 items-start"> 
                
                {/* ستون فیلترها (کاملاً هماهنگ با کانتینرهای لایت سایت) */}
            <aside className="w-full lg:w-72 shrink-0 bg-white border border-gray-100 rounded-xl p-5 h-fit lg:sticky lg:top-55 shadow-sm space-y-4 select-none">
                {/* هدر اصلی فیلترها */}
                <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center gap-2">
                        <svg className='w-5 h-5'>
                            <use href='#adjustments-vertical'></use>
                        </svg>
                        <h3 className="font-extrabold  text-gray-900">فیلترهای پیشرفته</h3>
                    </div>
                </div>

                {/* ۱. دراپ‌داون دسته‌بندی */}
                <div className="border-b border-gray-50 pb-3">
                    <button 
                        onClick={() => toggleFilter('categories')}
                        className="w-full flex items-center justify-between font-extrabold  text-gray-800 py-2 cursor-pointer text-right"
                    >
                        <span>دسته‌بندی محصولات</span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openFilters.categories ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${openFilters.categories ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="space-y-3  text-gray-600 pr-1">
                            {['دستگاه‌های CNC', 'قطعات یدکی', 'ابزارآلات برشی'].map((cat, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#D92F4E] focus:ring-[#D92F4E] accent-[#D92F4E]" /> 
                                    <span className="font-medium text-gray-700">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ۲. دراپ‌داون برندها */}
                <div className="border-b border-gray-50 pb-3">
                    <button 
                        onClick={() => toggleFilter('brands')}
                        className="w-full flex items-center justify-between font-extrabold  text-gray-800 py-2 cursor-pointer text-right"
                    >
                        <span>برندهای محصول</span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openFilters.brands ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${openFilters.brands ? 'max-h-48 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="space-y-3  text-gray-600 pr-1ނީ">
                            {['داهوا (Dahua)', 'برایتون (Briton)', 'هایک‌ویژن (Hikvision)', 'ایمو (Imou)'].map((brand, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#D92F4E] focus:ring-[#D92F4E] accent-[#D92F4E]" /> 
                                    <span className="font-medium text-gray-700">{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ۳. دراپ‌داون فیلتر قیمت */}
                <div className="border-b border-gray-50 pb-3">
                    <button 
                        onClick={() => toggleFilter('price')}
                        className="w-full flex items-center justify-between font-extrabold  text-gray-800 py-2 cursor-pointer text-right"
                    >
                        <span>فیلتر بر اساس قیمت</span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openFilters.price ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    <div className={`transition-all duration-300 overflow-hidden ${openFilters.price ? 'max-h-44 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-2 space-y-5">
                            
                            {/* باکس اسلایدرها */}
                            <div className="relative w-full h-2 bg-gray-100 rounded-full">
                                {/* خط رنگی بین دو دستگیره */}
                                <div 
                                    className="absolute h-full bg-[#D92F4E] rounded-full"
                                    style={{
                                        right: `${(minPrice / 200000000) * 100}%`,
                                        left: `${100 - (maxPrice / 200000000) * 100}%`
                                    }}
                                />
                                
                                {/* اینپوت رنج مینیمم */}
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="200000000" 
                                    step="2000000"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 2000000))}
                                    className="absolute w-full h-2 pointer-events-none appearance-none bg-transparent top-0 right-0 accent-[#D92F4E] cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D92F4E] [&::-webkit-slider-thumb]:appearance-none"
                                />

                                {/* اینپوت رنج ماکسیمم */}
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="200000000" 
                                    step="2000000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 2000000))}
                                    className="absolute w-full h-2 pointer-events-none appearance-none bg-transparent top-0 right-0 accent-[#D92F4E] cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D92F4E] [&::-webkit-slider-thumb]:appearance-none"
                                />
                            </div>

                            {/* نمایش ارقام فیلتر شده */}
                            <div className="space-y-2  font-bold text-gray-600">
                                <div className="flex items-center justify-between bg-gray-50/60 p-2.5 rounded-xl border border-gray-100/50">
                                    <span className="text-gray-400 font-medium">از قیمت:</span>
                                    <div className="flex items-center gap-1 text-gray-800">
                                        <span>{minPrice.toLocaleString('fa-IR')}</span>
                                        <span className="text-gray-400 font-medium">تومان</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between bg-gray-50/60 p-2.5 rounded-xl border border-gray-100/50">
                                    <span className="text-gray-400 font-medium">تا قیمت:</span>
                                    <div className="flex items-center gap-1 text-gray-800">
                                        <span>{maxPrice.toLocaleString('fa-IR')}</span>
                                        <span className="text-gray-400 font-medium">تومان</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ۴. فقط کالاهای موجود (توگل سوئیچ مدرن) */}
                <div className="flex items-center justify-between pt-2">
                    <span className="font-extrabold text-gray-800">فقط کالاهای موجود</span>
                    <button 
                        onClick={() => setOnlyAvailable(!onlyAvailable)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${onlyAvailable ? 'bg-[#D92F4E]' : 'bg-gray-400/70'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${onlyAvailable ? '-translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
            </aside>

                {/* بخش اصلی: مرتب‌سازی و گرید محصولات */}
                <main className="flex-1 w-full space-y-5">
                    
                    {/* نوار مرتب‌سازی */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm/5">
                        <div className="flex items-center gap-1.5  overflow-x-auto whitespace-nowrap pb-2 sm:pb-0 scrollbar-none">
                            <span className="font-extrabold text-gray-800 ml-2 shrink-0">مرتب‌سازی:</span>
                            
                            <button 
                                onClick={() => setSortBy('newest')} 
                                className={`px-4 py-2 rounded-xl  font-bold transition-all duration-300 cursor-pointer active:scale-95 ${sortBy === 'newest' ? 'bg-[#D92F4E] text-white shadow-md shadow-[#D92F4E]/20' : 'hover:bg-gray-50 text-gray-600'}`}>
                                جدیدترین‌ها
                            </button>
                            <button 
                                onClick={() => setSortBy('most_viewed')} 
                                className={`px-4 py-2 rounded-xl  font-bold transition-all duration-300 cursor-pointer active:scale-95 ${sortBy === 'most_viewed' ? 'bg-[#D92F4E] text-white shadow-md shadow-[#D92F4E]/20' : 'hover:bg-gray-50 text-gray-600'}`}>
                                پربازدیدترین‌ها
                            </button>
                            <button 
                                onClick={() => setSortBy('best_selling')} 
                                className={`px-4 py-2 rounded-xl  font-bold transition-all duration-300 cursor-pointer active:scale-95 ${sortBy === 'best_selling' ? 'bg-[#D92F4E] text-white shadow-md shadow-[#D92F4E]/20' : 'hover:bg-gray-50 text-gray-600'}`}>
                                پرفروش‌ترین‌ها
                            </button>
                            <button 
                                onClick={() => setSortBy('most_cheapest')} 
                                className={`px-4 py-2 rounded-xl  font-bold transition-all duration-300 cursor-pointer active:scale-95 ${sortBy === 'most_cheapest' ? 'bg-[#D92F4E] text-white shadow-md shadow-[#D92F4E]/20' : 'hover:bg-gray-50 text-gray-600'}`}>
                                ارزان‌ترین‌ها
                            </button>
                            <button 
                                onClick={() => setSortBy('most_expensive')} 
                                className={`px-4 py-2 rounded-xl  font-bold transition-all duration-300 cursor-pointer active:scale-95 ${sortBy === 'most_expensive' ? 'bg-[#D92F4E] text-white shadow-md shadow-[#D92F4E]/20' : 'hover:bg-gray-50 text-gray-600'}`}>
                                گران‌ترین‌ها
                            </button>
                        </div>
                        
                        <div className=" text-gray-400 font-medium shrink-0">
                            نمایش <span className="text-gray-800 font-extrabold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">۱۲</span> محصول آفر
                        </div>
                    </div>

                    {/* گرید محصولات */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                        
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                            <Link 
                                href="" 
                                key={item} 
                                className="bg-white border border-gray-100 hover:border-gray-200 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md/5 transition-all duration-300 group relative overflow-hidden p-3 hover:-translate-y-1"
                            >
                                <div>
                                    {/* تصویر محصول */}
                                    <div className="w-full aspect-square mb-3 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center relative border border-gray-100/30">
                                        <Image 
                                            src='/images/products/1.webp'
                                            alt="محصولات البرز CNC" 
                                            width={300} 
                                            height={300} 
                                            className="w-48 h-auto object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                                        />
                                        <span className="absolute top-2.5 right-2.5 bg-[#D92F4E] text-white  font-black px-2.5 py-1 rounded-lg shadow-sm tracking-wide">
                                            پیشنهاد ویژه
                                        </span>
                                    </div>

                                    {/* عناوین و متون کالا با ارتفاع فیکس شده */}
                                    <div className='px-1 mt-2 space-y-2'>
                                        <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-[#D92F4E] transition-colors duration-300 leading-snug">
                                            دستگاه صنعتی CNC سری البرز
                                        </h4>
                                        <p className=" text-gray-400 line-clamp-2 leading-relaxed overflow-hidden">
                                            توضیحات تکمیلی قطعات، موتور و سیستم کنترلر با بالاترین کیفیت بازدهی...
                                        </p>
                                    </div>
                                </div>
                                
                                {/* بخش قیمت و دکمه اکشن */}
                                <div className="border-t border-gray-50 flex items-center justify-between pt-3 mt-4 px-1">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-gray-400 line-through font-medium">۴۱۰,۰۰۰,۰۰۰</span>
                                        <span className="flex items-center gap-1 font-black text-[#D92F4E]">
                                            <span className='text-xl'>۳۶۸,۸۸۸,۹۸۱</span>
                                            <svg className="w-3.5 h-3.5 text-gray-400 fill-current"><use href="#toman"></use></svg>
                                        </span>
                                    </div>
                                    
                                    {/* دکمه فلش */}
                                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#D92F4E] text-gray-600 group-hover:text-white transition-all duration-300 border border-gray-100/70 group-hover:border-[#D92F4E] cursor-pointer shadow-sm active:scale-90">
                                        <svg className="w-5 h-5 transform hover:rotate-45">
                                            <use href='#eye'></use>
                                        </svg>
                                    </button>
                                </div>
                            </Link>
                        ))}

                    </div>
                </main>

            </div>
        </section>
    );
}