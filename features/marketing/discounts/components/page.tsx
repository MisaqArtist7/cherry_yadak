'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Product {
    title: string;
    price: number;
    description: string;
    discount: number;
    images: { url: string }[];
}

interface DiscountsComponentProps {
    discountProducts: Product[];
    currentPage: number;
    totalPages: number;
    totalProducts: number;
}

export default function DiscountsComponent({ 
    discountProducts, 
    currentPage, 
    totalPages,
    totalProducts 
}: DiscountsComponentProps) {
    const [sortBy, setSortBy] = useState('newest');
    const router = useRouter();
    const searchParams = useSearchParams();

    // تابع تغییر صفحه
    const handlePageChange = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <section className="offer_section container mx-auto px-4 py-8 text-gray-800 antialiased">
            <main className="w-full space-y-5">
                
                {/* نوار مرتب‌سازی */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm/5">
                    <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-2 sm:pb-0 scrollbar-none">
                        
                    </div>
                    
                    <div className="text-gray-400 font-medium shrink-0 flex items-center justify-center gap-2">
                        نمایش <span className="text-gray-800 font-extrabold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{discountProducts.length.toLocaleString('Fa-ir')}</span> از <span className="text-gray-800 font-extrabold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{totalProducts.toLocaleString('Fa-ir')}</span> کالا
                    </div>
                </div>

                {/* گرید محصولات */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {discountProducts.map((product, index) => (
                        <Link href="" key={index} className="bg-white border border-gray-100 hover:border-gray-200 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md/5 transition-all duration-300 group relative overflow-hidden p-3 hover:-translate-y-1">
                            {/* کدهای داخل کارت محصول شما بدون تغییر اینجا قرار می‌گیرد */}
                            <div>
                                <div className="w-full aspect-square mb-3 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center relative border border-gray-100/30">
                                    <Image src={product.images?.[0]?.url || '/default.jpg'} alt={product.title} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                                    <span className="absolute top-2.5 right-2.5 bg-[#D92F4E] text-white font-black px-2.5 py-1 rounded-lg shadow-sm">پیشنهاد ویژه</span>
                                </div>
                                <div className='px-1 mt-2 space-y-2'>
                                    <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-[#D92F4E] transition-colors duration-300">{product.title}</h4>
                                    <p className="text-gray-400 line-clamp-2">{product.description}</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-50 flex items-center justify-between pt-3 mt-4 px-1">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 line-through font-medium">{product.price.toLocaleString('fa-IR')}</span>
                                    <span className="flex items-center gap-1 font-black text-[#D92F4E]"><span className='text-xl'>{product.discount.toLocaleString('fa-IR')}</span> تومان</span>
                                </div>
                                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 border border-gray-100/70"><svg className="w-5 h-5"><use href='#eye'></use></svg></button>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* سیستم پجینیشن (Pagination UI) */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-8 border-t border-gray-100 select-none">
                        {/* دکمه صفحه قبلی */}
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* شماره صفحه‌ها */}
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                                    currentPage === page 
                                    ? 'bg-[#D92F4E] text-white shadow-md shadow-[#D92F4E]/20' 
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {page.toLocaleString('fa-IR')}
                            </button>
                        ))}

                        {/* دکمه صفحه بعدی */}
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

            </main>
        </section>
    );
}