import prisma from '@/lib/prisma'
import { getAllSubCategoryIds } from '@/lib/getCategoryTree'
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const { slug } = await params
    const resolvedSearchParams = await searchParams
    const decodedSlug = decodeURIComponent(slug)
    const currentPage = Number(resolvedSearchParams.page) || 1
    const pageSize = 24

    // مرحله ۲: پیدا کردن خود دسته
    const category = await prisma.categories.findUnique({
        where: { slug: decodedSlug },
        select: { id: true, name: true },
    })

    if (!category) {
        return (
            <div className="w-full bg-white py-20 text-center">
                <div className="inline-block p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-bold ">دسته‌بندی مورد نظر پیدا نشد.</p>
                </div>
            </div>
        )
    }

    // مرحله ۳: گرفتن id تمام زیردسته‌ها
    const subCategoryIds = await getAllSubCategoryIds(category.id)
    const allCategoryIds = [category.id, ...subCategoryIds]

    // مرحله ۴: کوئری محصولات با لیست id ها
    const [products, totalProducts] = await Promise.all([
        prisma.product.findMany({
            where: {
                categoryId: { in: allCategoryIds },
            },
            select: {
                id: true,
                title: true,
                slug: true,
                price: true,
                discount: true,
                description: true,
                images: {
                    select: { url: true, isMain: true }
                }
            },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
        }),
        prisma.product.count({
            where: {
                categoryId: { in: allCategoryIds },
            }
        })
    ])

    const totalPages = Math.ceil(totalProducts / pageSize)

    return (
        <section className='w-full min-h-screen py-8 text-gray-800 antialiased'>
            <div className='container mx-auto px-4'>
                
                {/* هدر بخش محصولات با استایل سفارشی شما */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center sm:flex-row sm:items-center justify-between gap-4 shadow-sm/5 mb-8">
                    <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-2 sm:pb-0 px-1 scrollbar-none">
                        <span className="flex justify-center items-center h-4 w-4 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                        </span>
                        <h2 className="font-extrabold text-xl md:text-2xl text-gray-900 leading-none">
                            محصولات {category.name}
                        </h2>
                    </div>
                    
                    <div className="text-gray-400  md: font-medium shrink-0 flex items-center justify-center gap-2">
                        نمایش <span className="text-gray-800 font-extrabold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{products.length.toLocaleString('fa-IR')}</span> از <span className="text-gray-800 font-extrabold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{totalProducts.toLocaleString('fa-IR')}</span> کالا
                    </div>
                </div>

                {/* گرید محصولات */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5'>
                    {products.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <p className="text-gray-500 font-bold ">محصولی در این دسته‌بندی یافت نشد.</p>
                        </div>
                    ) : (
                        products.map((product) => {
                            const imageMain = product.images.find((img) => img.isMain) || product.images[0]
                            const hasDiscount = product.discount > 0

                            return (
                                <Link 
                                    href={`/product/${product.slug}`} 
                                    key={product.id} 
                                    className="bg-white border border-gray-100/80 hover:border-transparent rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 group relative overflow-hidden p-3 md:p-3.5 hover:-translate-y-1.5"
                                >
                                    <div>
                                        {/* تصویر محصول */}
                                        <div className="w-full aspect-square mb-3 bg-gray-50/60 rounded-xl overflow-hidden flex items-center justify-center relative border border-gray-100/50">
                                            <Image 
                                                src={imageMain?.url || "/images/default.jpg"}
                                                width={444} 
                                                height={444} 
                                                alt={product.title} 
                                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply'
                                            />
                                            {hasDiscount && (
                                                <span className="absolute top-2.5 right-2.5 bg-[#D92F4E] text-white text-[10px] md: font-black px-2.5 py-1 rounded-lg shadow-md shadow-[#D92F4E]/20">
                                                    پیشنهاد ویژه
                                                </span>
                                            )}
                                        </div>

                                        {/* عناوین و توضیحات */}
                                        <div className='px-1 space-y-1.5'>
                                            <h3 className="font-bold text-gray-900  md: line-clamp-1 group-hover:text-[#D92F4E] transition-colors duration-300 leading-snug">
                                                {product.title}
                                            </h3>
                                            <p className="text-gray-400 text-[11px] md: line-clamp-2 leading-relaxed h-8 overflow-hidden">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* بخش قیمت و دکمه */}
                                    <div className="border-t border-gray-100 flex items-center justify-between pt-3 mt-4 px-1">
                                        <div className="flex flex-col gap-0.5">
                                            {hasDiscount ? (
                                                <>
                                                    <span className="text-gray-400  line-through font-medium">
                                                        {product.price.toLocaleString('fa-IR')}
                                                    </span>
                                                    <span className="flex items-center gap-1 font-black text-[#D92F4E]">
                                                        <span className=' md: lg:text-lg'>{product.discount.toLocaleString('fa-IR')}</span>
                                                        <span className="text-[10px] text-gray-400 font-medium">تومان</span>
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-transparent  select-none">.</span>
                                                    <span className="flex items-center gap-1 font-black text-gray-800">
                                                        <span className=' md: lg:text-lg'>{product.price.toLocaleString('fa-IR')}</span>
                                                        <span className="text-[10px] text-gray-400 font-medium">تومان</span>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        
                                        <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#D92F4E] text-gray-500 group-hover:text-white transition-all duration-300 border border-gray-100 group-hover:border-[#D92F4E] cursor-pointer shadow-sm group-hover:shadow-md group-hover:shadow-[#D92F4E]/30 active:scale-90 shrink-0">
                                            <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>

                {/* پجینیشن سروری */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-10 mt-10 border-t border-gray-100 select-none">
                        {currentPage > 1 ? (
                            <Link 
                                href={`/category/${slug}?page=${currentPage - 1}`}
                                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ) : (
                            <span className="p-2.5 rounded-xl border border-gray-100 text-gray-300 bg-gray-50/50 cursor-not-allowed">
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        )}

                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/category/${slug}?page=${page}`}
                                className={`w-9 h-9 md:w-10 md:h-10 rounded-xl font-bold flex items-center justify-center transition-all duration-300 active:scale-95  md: ${
                                    currentPage === page 
                                    ? 'bg-[#D92F4E] text-white shadow-lg shadow-[#D92F4E]/25' 
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:shadow-sm'
                                }`}
                            >
                                {page.toLocaleString('fa-IR')}
                            </Link>
                        ))}

                        {currentPage < totalPages ? (
                            <Link 
                                href={`/category/${slug}?page=${currentPage + 1}`}
                                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ) : (
                            <span className="p-2.5 rounded-xl border border-gray-100 text-gray-300 bg-gray-50/50 cursor-not-allowed">
                                <svg className="w-4 h-4 md:w-5 md:h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}