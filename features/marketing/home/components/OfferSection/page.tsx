
'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function OfferComponent() {

    return (
        <div className="offer_section mx-auto px-4">
                <div className="bg-[#D92F4E] grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 rounded-r-3xl rounded-l p-6 my-5">
                    
                    <div className="flex md:flex-col flex-row justify-between md:justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center gap-1">
                            <Image src="/images/Amazings.svg" width={100} height={100} alt="offer" />
                            <Image src="/images/Amazing.svg" width={77} height={77} alt="percent" />
                        </div>
                        <Link href="" className="bg-white/10 text-white flex items-center px-4 py-2 rounded-xl hover:bg-white hover:text-[#D92F4E] transition-all font-bold text-sm">
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
                            {Array.from({ length: 10 }).map((_, i) => (
                                <SwiperSlide key={i}>
                                    <div className="bg-white rounded-xs p-4 flex flex-col items-center gap-3 h-full">
                                        <Image src="/images/products/1.webp" width={222} height={222} alt="product" className="w-44 h-44 object-contain" />
                                        <h2 className="text-gray-800 text-sm font-medium line-clamp-2">
                                            گوشی مدل آیفون ۱۷ پرو مکس
                                        </h2>
                                        <div className="w-full mt-auto">
                                            <div className='flex items-center justify-end gap-1 w-full text-gray-900 font-bold'>
                                                <span>۳۶۸،۱۲۳،۴۵۶</span>
                                                <svg className='w-4 h-4 text-gray-500'><use href='#toman'></use></svg>
                                            </div>
                                            <div className='flex items-center justify-between w-full mt-2'>
                                                <span className='bg-[#de0c33] text-white px-2 py-0.5 rounded-full font-bold'>۳۵٪</span>
                                                <span className='text-gray-400 line-through'>۳۷۰،۱۳۲،۶۵۸</span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
        </div>
    )
}
