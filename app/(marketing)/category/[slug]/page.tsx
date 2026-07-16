import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const { slug } = await params
    const resolvedSearchParams = await searchParams
    
    const decodedSlug = decodeURIComponent(slug)
    const currentPage = Number(resolvedSearchParams.page) || 1
    const pageSize = 24 // هر صفحه حداکثر ۲۴ محصول

    console.log("SLUG FROM URL:", decodedSlug)

    // اجرای هم‌زمان کوئری‌ها برای کاهش فشار روی دیتابیس و افزایش سرعت لود
    const [products, totalProducts] = await Promise.all([
        prisma.product.findMany({
            where: {
                category: {
                    slug: decodedSlug,
                },
            },
            select: {
                id: true, 
                title: true,
                slug: true,
                price: true,
                discount: true,
                description: true,
                images: {
                    select: {
                        url: true,
                        isMain: true,
                    }
                }
            },
            skip: (currentPage - 1) * pageSize, // رد کردن محصولات صفحات قبل
            take: pageSize, // لود فقط ۲۴ محصول
        }),
        prisma.product.count({
            where: {
                category: {
                    slug: decodedSlug,
                }
            }
        })
    ])

    const totalPages = Math.ceil(totalProducts / pageSize)

    return (
        <section className='container mx-auto px-4 py-8 text-gray-800 antialiased'>
            <h2 className="font-extrabold text-xl md:text-2xl mb-6 text-gray-900 border-r-4 border-[#D92F4E] pr-3">
                محصولات این دسته‌بندی
            </h2>

            {/* گرید محصولات ریسپانسیو و بهینه */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
                {products.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <p className="text-gray-500 font-bold">محصولی در این دسته‌بندی یافت نشد.</p>
                    </div>
                ) : (
                products.map((product) => {
                        // پیدا کردن تصویر اصلی یا اولین تصویر کالا
                        const imageMain = product.images.find((img) => img.isMain) || product.images[0]
                        const hasDiscount = product.discount > 0

                        return (
                            <Link 
                                href={`/product/${product.slug}`} 
                                key={product.id} 
                                className="bg-white border border-gray-100 hover:border-gray-200 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md/5 transition-all duration-300 group relative overflow-hidden p-3 hover:-translate-y-1"
                            >
                                <div>
                                    {/* تصویر محصول به همراه تگ پیشنهاد ویژه */}
                                    <div className="w-full aspect-square mb-3 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center relative border border-gray-100/30">
                                        <Image 
                                            src={imageMain?.url || "/images/default.jpg"}
                                            width={444} 
                                            height={444} 
                                            alt={product.title} 
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply'
                                        />
                                        {hasDiscount && (
                                            <span className="absolute top-2 right-2 bg-[#D92F4E] text-white text-[10px] md:text-xs font-black px-2 py-0.5 md:py-1 rounded-lg shadow-sm">
                                                پیشنهاد ویژه
                                            </span>
                                        )}
                                    </div>

                                    {/* عنوان و توضیحات با محدودیت خط برای یکدستی کارت‌ها */}
                                    <div className='px-1 mt-2 space-y-2'>
                                        <h4 className="font-bold text-gray-900 text-xs md:text-sm line-clamp-1 group-hover:text-[#D92F4E] transition-colors duration-300 leading-snug">
                                            {product.title}
                                        </h4>
                                        <p className="text-gray-400 text-[11px] md:text-xs line-clamp-2 leading-relaxed h-8 overflow-hidden">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* بخش قیمت و دکمه ورود به محصول */}
                                <div className="border-t border-gray-50 flex items-center justify-between pt-3 mt-4 px-1">
                                    <div className="flex flex-col gap-0.5">
                                        {hasDiscount ? (
                                            <>
                                                {/* نمایش قیمت قبل از تخفیف */}
                                                <span className="text-gray-400 text-xs line-through font-medium">
                                                    {product.price.toLocaleString('fa-IR')}
                                                </span>
                                                {/* قیمت تخفیف خورده */}
                                                <span className="flex items-center gap-1 font-black text-[#D92F4E]">
                                                    <span className='text-sm md:text-lg'>{product.discount.toLocaleString('fa-IR')}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium">تومان</span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                {/* فاصله خالی برای حفظ یکپارچگی ارتفاع در صورت عدم تخفیف */}
                                                <span className="text-transparent text-xs select-none">.</span>
                                                {/* قیمت اصلی کالا */}
                                                <span className="flex items-center gap-1 font-black text-gray-800">
                                                    <span className='text-sm md:text-lg'>{product.price.toLocaleString('fa-IR')}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium">تومان</span>
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    
                                    {/* دکمه مشاهده جزئیات محصول */}
                                    <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#D92F4E] text-gray-600 group-hover:text-white transition-all duration-300 border border-gray-100/70 group-hover:border-[#D92F4E] cursor-pointer shadow-sm active:scale-90 shrink-0">
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

            {/* پجینیشن سروری زیبا و سبک */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8 mt-8 border-t border-gray-100 select-none">
                    {/* دکمه صفحه قبلی */}
                    {currentPage > 1 ? (
                        <Link 
                            href={`/category/${slug}?page=${currentPage - 1}`}
                            className="p-2 md:p-2.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ) : (
                        <span className="p-2 md:p-2.5 rounded-xl border border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed">
                            <svg className="w-4 h-4 md:w-5 md:h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    )}

                    {/* شماره صفحه‌ها */}
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                        <Link
                            key={page}
                            href={`/category/${slug}?page=${page}`}
                            className={`w-9 h-9 md:w-10 md:h-10 rounded-xl font-bold flex items-center justify-center transition-all duration-300 active:scale-95 text-xs md:text-sm ${
                                currentPage === page 
                                ? 'bg-[#D92F4E] text-white shadow-md shadow-[#D92F4E]/20' 
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {page.toLocaleString('fa-IR')}
                        </Link>
                    ))}

                    {/* دکمه صفحه بعدی */}
                    {currentPage < totalPages ? (
                        <Link 
                            href={`/category/${slug}?page=${currentPage + 1}`}
                            className="p-2 md:p-2.5 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ) : (
                        <span className="p-2 md:p-2.5 rounded-xl border border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    )}
                </div>
            )}
        </section>
    )
}