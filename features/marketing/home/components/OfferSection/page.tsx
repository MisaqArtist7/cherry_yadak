
'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    title : string,
    slug: string,
    description: string,
    price : number,
    discount : number,
    images : { url : string }[]
}

export default function OfferComponent({ discountProducts } : { discountProducts : Product[] } ) {

    return (
        <div className="offer_section mx-auto px-4">
                <div className="bg-[#D92F4E] grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 rounded-r-3xl rounded-l p-6 my-5">
                    
                    <div className="flex md:flex-col flex-row justify-between md:justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center gap-1">
                            <Image src="/images/Amazings.svg" width={100} height={100} alt="offer" />
                            <Image src="/images/Amazing.svg" width={77} height={77} alt="percent" />
                        </div>
                        <Link href='/discounts' className="bg-white/10 text-white flex items-center px-4 py-2 rounded-xl hover:bg-white hover:text-[#D92F4E] transition-all font-bold ">
                            مشاهده همه
                            <svg className="w-5 h-5"><use href="#chevron-left"></use></svg>
                        </Link>
                    </div>

                    <div className="min-w-0"> 
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
                        {discountProducts.map((product, index) => {
                        const discountPercentage = 35; 

                        return (
                                <SwiperSlide key={index}>
                                    <Link 
                                        href={`/product/${product.slug}`} 
                                        className="group bg-white rounded-2xl p-3  flex flex-col items-center gap-3 h-80 border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 relative overflow-hidden"
                                    >
                                        {/* بدج درصد تخفیف در بالای کارت */}
                                        <div className="absolute top-1 right-1 z-10 bg-[#D92F4E] text-white text-xs px-2.5 py-1 rounded-lg font-black shadow-sm tracking-tighter">
                                            {discountPercentage.toLocaleString('fa-IR')}٪
                                        </div>

                                        {/* بخش تصویر با هاور زوم ملایم */}
                                        <div className="relative overflow-hidden rounded-xl">
                                            <Image 
                                                src={product.images?.[0]?.url || '/no-image.png'} 
                                                width={1111}
                                                height={1111}
                                                alt={product.title} 
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"

                                            />
                                        </div>

                                        {/* بخش متنی: عنوان + توضیحات کوتاه */}
                                        <div className="w-full flex flex-col gap-1 h-20 justify-start overflow-hidden">
                                            {/* عنوان محصول */}
                                            <h2 className="text-gray-800 text-right w-full font-bold text-sm sm:text-base leading-6 line-clamp-2 group-hover:text-[#D92F4E] transition-colors duration-200">
                                                {product.title}
                                            </h2>
                                            
                                            {/* توضیحات محصول */}
                                            {product.description && (
                                                <p className="text-gray-400 text-right w-full font-medium text-xs leading-5 line-clamp-1">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* بخش قیمت‌ها (تراز شده در پایین کارت) */}
                                        <div className="w-full mt-auto pt-3 border-t border-gray-50 flex flex-col gap-1">
                                            
                                            {/* قیمت قبلی (خط خورده) */}
                                            <div className="flex items-center justify-end">
                                                <span className="text-xs sm:text-sm text-gray-400 line-through tracking-tight font-medium">
                                                    {product.price.toLocaleString('fa-IR')}
                                                </span>
                                            </div>

                                            {/* قیمت جدید با تخفیف و آیکون تومان */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] text-[#D92F4E] font-bold bg-red-50 px-2 py-0.5 rounded-md">تخفیف ویژه</span>
                                                <div className='flex items-center gap-1 text-gray-900 font-black text-lg sm:text-xl'>
                                                    <span>{product.discount.toLocaleString('fa-IR')}</span>
                                                    <svg className='w-5 h-5 text-gray-700'><use href='#toman'></use></svg>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })}
                        </Swiper>
                    </div>
                </div>
        </div>
    )
}
