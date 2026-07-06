'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'

export default function CarouselComponent() {
    return (
        <div className="w-full h-100 bg-gray-100" dir="rtl">
            <Swiper 
                modules={[Pagination, Autoplay]} 
                pagination={{ clickable: true }} 
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full h-full"
            >
                {[1, 2, 3, 4, 5].map((num) => (
                    <SwiperSlide key={num}>
                        <Image 
                            src={`/images/sliders/${num}.webp`} 
                            fill
                            alt={`Slide ${num}`} 
                            className='object-cover' 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}