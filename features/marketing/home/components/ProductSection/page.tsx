'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    title: string;
    slug: string,
    price: number;
    description: string,
    images: { url: string }[]; 
}

export default function ProductsComponent({ products }: { products: Product[] }) {
    return (
        <>
            <div className="flex items-center justify-between mt-11 border-b border-gray-100 pb-4">
                <div className='flex items-center justify-center gap-2'>
                    <span className="flex justify-center items-center h-4 w-4 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </span>
                    <h2 className="font-bold text-lg md:text-xl text-gray-950">
                        جدید ترین محصولات
                    </h2>
                </div>
                <div></div>
            </div>

            <div className='py-1'>
                <Swiper
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    spaceBetween={4}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 },
                        1300: { slidesPerView: 6 },
                        1800: { slidesPerView: 7 },
                    }}
                >
                {products.map((product, index) => (
                    <SwiperSlide key={index} className="h-auto!">
                        <Link 
                            href={`/product/${product.slug}`} 
                            className="bg-white shadow-sm rounded-2xl flex flex-col justify-between transition-all duration-300 group relative overflow-hidden p-4 hover:-translate-y-1 h-full min-h-90"
                        >
                            {/* بخش بالایی: تصویر + عنوان + توضیحات */}
                            <div className="flex flex-col grow min-w-0">
                                {/* تصویر محصول */}
                                <div className="w-full aspect-square mb-3 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center relative border border-gray-100/30 shrink-0">
                                    <Image
                                        src={product.images?.[0]?.url || '/no-image.png'}
                                        fill
                                        sizes="(max-width: 640px) 50vw, 20vw"
                                        alt={product.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        priority={index < 4}
                                    />
                                </div>

                                {/* بخش متنی: عنوان + توضیحات */}
                                <div className='flex flex-col gap-1 min-w-0 grow'>
                                    <h2 className="text-gray-800 w-full font-bold text-sm sm:text-base leading-6 line-clamp-2 group-hover:text-[#D92F4E] transition-colors duration-200">
                                        {product.title}
                                    </h2>
                                    <p className="text-gray-400 w-full font-medium text-xs leading-5 line-clamp-1 mt-auto">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* بخش پایینی: قیمت و دکمه */}
                            <div className="w-full mt-auto pt-3 border-t border-gray-50 flex items-center justify-between shrink-0">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs text-gray-400 font-medium">قیمت</span>
                                    <div className='flex items-center gap-1 text-gray-900 font-black text-base sm:text-lg'>
                                        <span>{product.price.toLocaleString('fa-IR')}</span>
                                        <svg className='w-4 h-4 text-gray-700'><use href='#toman'></use></svg>
                                    </div>
                                </div>
                                
                                {/* دکمه مشاهده */}
                                <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#D92F4E] text-gray-600 group-hover:text-white transition-all duration-300 border border-gray-100/70 group-hover:border-[#D92F4E] cursor-pointer shadow-sm active:scale-90 shrink-0">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </>
    )
}