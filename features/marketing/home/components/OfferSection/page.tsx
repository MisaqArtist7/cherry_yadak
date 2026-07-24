'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    id?: string;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    discount: number; // قیمت بعد از تخفیف
    images: { url: string; isMain?: boolean }[];
}

export default function OfferComponent({ discountProducts }: { discountProducts: Product[] }) {
    return (
        <div className="offer_section mx-auto px-1 sm:px-0">
            <div className="bg-[#D92F4E] grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-3 rounded-2xl p-4 sm:p-5 my-5 shadow-lg shadow-red-500/10">
                
                {/* بخش سمت چپ: لوگوها و دکمه مشاهده همه */}
                <div className="flex md:flex-col flex-row justify-between md:justify-center items-center gap-4 py-2">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/images/Amazings.svg" width={90} height={90} alt="پیشنهاد شگفت انگیز" className="w-20 md:w-24" />
                        <Image src="/images/Amazing.svg" width={70} height={70} alt="شگفت انگیز" className="w-16 md:w-17.5" />
                    </div>
                    <Link 
                        href='/discounts' 
                        className="bg-white/10 hover:bg-white text-white hover:text-[#D92F4E] flex items-center gap-1 px-4 py-2 rounded-xl transition-all font-bold text-xs sm:text-sm border border-white/20"
                    >
                        مشاهده همه
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
                        </svg>
                    </Link>
                </div>

                {/* اسلایدر محصولات */}
                <div className="min-w-0">
                    <Swiper
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        breakpoints={{
                            480: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                            2200: { slidesPerView: 6 },
                        }}
                        className="mySwiper pb-2!"
                    >
                        {discountProducts.map((product, index) => {
                            // پیدا کردن تصویر اصلی یا اول
                            const imageMain = product.images?.find((img) => img.isMain) || product.images?.[0];
                            
                            // محاسبه درصد تخفیف
                            let discountPercentage = 0;
                            if (product.price > 0 && product.discount < product.price) {
                                discountPercentage = Math.round(((product.price - product.discount) / product.price) * 100);
                            }

                            return (
                                <SwiperSlide key={product.id || index} className="h-auto!">
                                    <Link 
                                        href={`/product/${product.slug}`} 
                                        className="bg-white border border-gray-100 hover:border-gray-200 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden p-3 hover:-translate-y-1 h-full min-h-90"
                                    >
                                        {/* بخش بالایی: تصویر + عنوان + توضیحات */}
                                        <div className="flex flex-col grow min-w-0">
                                            {/* تصویر محصول */}
                                            <div className="w-full aspect-square mb-3 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center relative border border-gray-100/30 shrink-0">
                                                <Image 
                                                    src={imageMain?.url || "/no-image.png"}
                                                    alt={product.title} 
                                                    fill
                                                    sizes="(max-width: 640px) 50vw, 20vw"
                                                    className='object-contain p-2 w-full h-full'
                                                />
                                                {discountPercentage > 0 && (
                                                    <span className="absolute top-2 right-2 bg-[#D92F4E] text-white text-[10px] md:text-xs font-black px-2 py-0.5 md:py-1 rounded-lg shadow-sm" dir="ltr">
                                                        %{discountPercentage.toLocaleString('fa-IR')}
                                                    </span>
                                                )}
                                            </div>

                                            {/* عنوان و توضیحات بدون ارتفاع ثابت و بدون سرریز */}
                                            <div className='px-1 mt-1 flex flex-col gap-1 min-w-0 grow'>
                                                <h4 className="font-bold text-gray-900 text-xs md:text-sm line-clamp-2 group-hover:text-[#D92F4E] transition-colors duration-300 leading-snug">
                                                    {product.title}
                                                </h4>
                                                {product.description && (
                                                    <p className="text-gray-400 text-[11px] md:text-xs line-clamp-2 leading-relaxed mt-auto">
                                                        {product.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* بخش پایینی: قیمت و دکمه */}
                                        <div className="border-t border-gray-100 flex items-center justify-between pt-3 mt-3 px-1 shrink-0">
                                            <div className="flex flex-col gap-0.5">
                                                {/* قیمت قبل از تخفیف */}
                                                <span className="text-gray-400 text-xs line-through font-medium min-h-4">
                                                    {product.price.toLocaleString('fa-IR')}
                                                </span>
                                                {/* قیمت تخفیف خورده */}
                                                <span className="flex items-center gap-1 font-black text-[#D92F4E]">
                                                    <span className='text-sm md:text-base lg:text-lg'>
                                                        {product.discount.toLocaleString('fa-IR')}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 font-medium">تومان</span>
                                                </span>
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
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}