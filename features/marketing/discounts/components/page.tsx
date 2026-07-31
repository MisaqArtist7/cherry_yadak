'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Product {
    title: string;
    slug: string;
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
                    <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-2 sm:pb-0 scrollbar-none px-1">
                        <span className="flex justify-center items-center h-4 w-4 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                        </span>
                        <h2 className="font-extrabold text-xl md:text-2xl text-gray-900 leading-none">
                            محصولات تخفیف دار ما
                        </h2>
                    </div>
                    
                    <div className="text-gray-400 font-medium shrink-0 flex items-center justify-center gap-2">
                        نمایش <span className="text-gray-800 font-extrabold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{discountProducts.length.toLocaleString('Fa-ir')}</span> از <span className="text-gray-800 font-extrabold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{totalProducts.toLocaleString('Fa-ir')}</span> کالا
                    </div>
                </div>

                {/* گرید محصولات */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {discountProducts.map((product, index) => (
                    <Link
                        href={`/product/${product.slug}`}
                        key={index}
                        className="bg-white border border-gray-100 hover:border-gray-200 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 ease-out group relative overflow-hidden p-3 hover:-translate-y-1 h-full min-h-90 focus:outline-none focus:ring-2 focus:ring-[#D92F4E]"
                    >
                        {/* بالا */}
                        <div className="flex flex-col grow min-w-0">
                        
                        {/* تصویر */}
                        <div className="w-full aspect-square mb-3 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center relative border border-gray-100/30 shrink-0">
                            <Image
                            src={product.images?.[0]?.url || "/default.jpg"}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 50vw, 20vw"
                            className="object-contain p-1 w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* badge */}
                            <span className="absolute top-2 right-2 bg-[#D92F4E]/90 text-white text-[10px] md:text-xs font-black px-2 py-0.5 md:py-1 rounded-lg shadow-sm">
                            پیشنهاد ویژه
                            </span>
                        </div>

                        {/* متن */}
                        <div className="px-1 mt-1 flex flex-col gap-1.5 min-w-0 grow">
                            <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug group-hover:text-[#D92F4E] transition-colors duration-200">
                            {product.title}
                            </h4>

                            {product.description && (
                            <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                                {product.description}
                            </p>
                            )}
                        </div>
                        </div>

                        {/* پایین */}
                        <div className="border-t border-gray-100 flex items-center justify-between pt-3 mt-3 px-1 shrink-0">
                        <div className="flex flex-col gap-0.5">
                            
                            {/* قیمت قبلی */}
                            <span className="text-gray-400 text-xs line-through font-medium min-h-4">
                            {product.price.toLocaleString("fa-IR")}
                            </span>

                            {/* قیمت جدید */}
                            <span className="flex items-center gap-1 font-black text-[#D92F4E]">
                            <span className="text-sm md:text-base lg:text-lg">
                                {product.discount.toLocaleString("fa-IR")}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">تومان</span>
                            </span>
                        </div>

                        {/* CTA */}
                        <div
                            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#D92F4E] text-gray-600 group-hover:text-white transition-all duration-200 border border-gray-100/70 group-hover:border-[#D92F4E] shadow-sm active:scale-90"
                            aria-label="مشاهده محصول"
                        >
                            <svg
                            className="w-4 h-4 md:w-5 md:h-5 transform group-hover:rotate-45 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
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
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

            </main>
        </section>
    );
}