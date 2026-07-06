'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

type Product = { title: string, price: number, images: string[] }

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
                <div>
                    <Link href='/offer' className="flex items-center font-medium 
                    text-[#ED1945] border-2 border-[#ED1945]/30 
                    px-2 py-2 md:px-4 md:py-2 rounded-xl
                    hover:bg-[#ED1945] hover:text-white
                    transition-all duration-150 group">
                        مشاهده همه
                        <svg className="w-4 h-4">
                            <use href="#chevron-left"></use>
                        </svg>
                    </Link>
                </div>
            </div>
            <div>
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
                    <Link href='' className="bg-white rounded-xs p-4 flex flex-col items-center gap-3 h-83.25 border border-zinc-200 shadow">
                        <div className="relative w-50 h-50">
                            <Image
                                src={product.images?.[0]?.url || '/no-image.png'}
                                fill
                                alt={product.title}
                                className="object-contain"
                                sizes="369px"
                            />
                        </div>
                        <h2 className="text-gray-800 w-full font-medium leading-6 line-clamp-2">
                            {product.title}
                        </h2>
                        <div className="w-full mt-auto">
                            <div className='flex items-center justify-end gap-1 w-full text-gray-900 font-bold text-xl'>
                                <span>{product.price.toLocaleString('Fa-ir')}</span>
                                <svg className='w-5 h-5'><use href='#toman'></use></svg>
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