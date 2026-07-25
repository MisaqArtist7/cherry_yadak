'use client'; // اگر از App Router در Next.js استفاده می‌کنید

import Link from 'next/link';
import Image from 'next/image';

// ایمپورت ماژول‌ها و استایل‌های Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Category  {
    slug: string,
    name: string,
    image: string
}

export default function CategorySection({ categories } : { categories : Category[] }) {
    return (
        <section className='category_section container mx-auto px-5 py-10 text-gray-800'>
            {/* هدر بخش دسته‌بندی با دکمه‌های قبلی و بعدی */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                <div className='flex items-center justify-center gap-2'>
                    <span className="flex justify-center items-center h-4 w-4 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </span>
                    <h2 className="font-bold text-lg md:text-xl text-gray-950">
                        دسته‌بندی‌ها
                    </h2>
                </div>

                {/* دکمه‌های ناوبری (بعدی / قبلی) */}
                <div className="flex items-center gap-2 dir-ltr">
                    <button 
                        id="category-swiper-prev"
                        aria-label="Previous slide"
                        className="w-10 h-10 rounded-full bg-white hover:bg-rose-500 hover:text-white text-gray-600 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:hover:bg-slate-100 disabled:hover:text-gray-600 disabled:cursor-not-allowed shadow-sm font-bold text-sm"
                    >
                        <svg className='w-7 h-7'>
                            <use href='#chevron-right'></use>
                        </svg>
                    </button>
                    <button 
                        id="category-swiper-next"
                        aria-label="Next slide"
                        className="w-10 h-10 rounded-full bg-white hover:bg-rose-500 hover:text-white text-gray-600 flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:hover:bg-slate-100 disabled:hover:text-gray-600 disabled:cursor-not-allowed shadow-sm font-bold text-sm"
                    >
                        <svg className='w-7 h-7'>
                            <use href='#chevron-left'></use>
                        </svg>
                    </button>
                </div>
            </div>

            {/* اسلایدر سوییپر */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                navigation={{
                    nextEl: '#category-swiper-next',
                    prevEl: '#category-swiper-prev',
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 16 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                    1280: { slidesPerView: 5, spaceBetween: 20 },
                    1536: { slidesPerView: 6, spaceBetween: 24 },
                }}
                className="category_swiper py-4!"
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index} className="h-auto!">
                        <Link 
                            href={`/category/${category.slug}`} 
                            className='bg-white rounded-md p-5 shadow-sm hover:shadow-md hover:shadow-rose-300 hover:border-(--primaryColor) transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-pointer h-full border border-transparent'
                        >
                            {/* دایره‌ی پس‌زمینه تصویر */}
                            <div className='w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-rose-50 flex items-center justify-center mb-4 relative transition-all duration-300 group-hover:bg-rose-100 group-hover:scale-105'>
                                <Image 
                                    src={category.image || "/images/default.jpg"}
                                    width={400} 
                                    height={400} 
                                    alt={category.name} 
                                    className='w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-md transition-transform duration-300 group-hover:-rotate-3' 
                                />
                            </div>
                            <span className='text-xs sm:text-sm font-extrabold text-gray-700 group-hover:text-(--primaryColor) transition-colors line-clamp-1'>
                                {category.name}
                            </span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}