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
                    <SwiperSlide key={index}>
                        <Link 
                            href={`/product/${product.slug}`} 
                            className="group bg-white rounded-2xl p-4 flex flex-col items-center gap-3 h-85 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* بخش تصویر محصول با هاور زوم ملایم */}
                            <div className="relative  overflow-hidden rounded-xl">
                                <Image
                                    src={product.images?.[0]?.url || '/no-image.png'}
                                    width={1111}
                                    height={1111}
                                    alt={product.title}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                    priority={index < 4} // برای سرعت بیشتر در لود تصاویر اولیه اسلایدر
                                />
                            </div>

                            {/* بخش متنی: عنوان + توضیحات کوتاه */}
                            <div className="w-full flex flex-col gap-1 h-20 justify-start overflow-hidden">
                                
                                {/* عنوان محصول */}
                                <h2 className="text-gray-800 w-full font-bold text-sm sm:text-base leading-6 line-clamp-2 group-hover:text-[#D92F4E] transition-colors duration-200">
                                    {product.title}
                                </h2>
                                
                                {/* توضیحات محصول (با رنگ ملایم‌تر و وزن سبک‌تر برای جذابیت و خوانایی بیشتر) */}
                                <p className="text-gray-400 w-full font-medium text-xs sm:text-xs leading-5 line-clamp-1">
                                    {product.description}
                                </p>
                                
                            </div>

                            {/* بخش قیمت (تراز شده در پایین کارت) */}
                            <div className="w-full mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium">قیمت</span>
                                <div className='flex items-center gap-1 text-gray-900 font-black text-lg sm:text-xl'>
                                    <span>{product.price.toLocaleString('fa-IR')}</span>
                                    <svg className='w-5 h-5 text-gray-700'><use href='#toman'></use></svg>
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