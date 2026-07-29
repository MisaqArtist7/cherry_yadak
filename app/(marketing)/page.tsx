
import ProductsComponent from '@/features/marketing/home/components/ProductSection/page'
import OfferComponent from '@/features/marketing/home/components/OfferSection/page'
import CategorySection from '@/features/marketing/home/components/CategoriesSection/page'
import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache' 

// ۲. کش کردن کوئری محصولات عادی
const getProducts = unstable_cache(
    async () => {
        return await prisma.product.findMany({
            where: { 
                discount: {
                    equals: 0
                }
            },
            select: {
                title: true,
                slug: true,
                description: true,
                price: true,
                images: {
                    where: { isMain: true },
                    select: {
                        url: true,
                    },
                    take: 1,
                }
            }
        })
    },
    ['home-products-list'],
    { 
        revalidate: 3600, 
        tags: ['products'] 
    }
)

// ۳. کش کردن کوئری محصولات تخفیف‌دار
const getDiscountProducts = unstable_cache(
    async () => {
        return await prisma.product.findMany({
            where: {
                discount: {
                    gt: 0
                }
            },
            select: {
                title: true,
                slug: true,
                description: true,
                price: true,
                discount: true,
                images: {
                    where: { isMain: true },
                    select: {
                        url: true,
                    },
                    take: 1,
                }
            }
        })
    },
    ['home-discount-products-list'],
    { 
        revalidate: 3600, 
        tags: ['products'] 
    }
)

// ۴. کش کردن دسته‌بندی‌ها
const getCategories = unstable_cache(
    async () => {
        return await prisma.categories.findMany({
            where: {
                parentId: null,
            }
        })
    },
    ['home-categories-list'],
    { 
        revalidate: 86400, // مثلا کش ۲۴ ساعته برای دسته‌بندی‌ها
        tags: ['categories'] // تگ دسته‌بندی‌ها
    }
)

export default async function page() {
        // فراخوانی توابع کش‌شده
        const [categories, products, discountProducts] = await Promise.all([
        getCategories(),
        getProducts(),
        getDiscountProducts(),
    ])

    return (
        <div className="space-y-10 md:space-y-16 pb-12">  
            {/* ۱. سکشن هیرو (Hero Banner) */}
            <section className="relative w-full overflow-hidden">
                <div className="relative w-full h-80 sm:h-112.5 md:h-130 lg:h-145">
                    <Image 
                        src="/images/hero.jpg" 
                        alt="تامین قطعات اصلی چری و ام‌وی‌ام - چری یدک" 
                        fill
                        priority
                        className="object-cover object-center" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-black/40 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-[#D92F4E] bg-white/90 backdrop-blur-md font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 shadow-md">
                            تضمین اصالت و کیفیت قطعات
                        </span>
                        <h1 className="text-white font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-snug max-w-3xl">
                            فروشگاه تخصصی قطعات یدکی چری یدک
                        </h1>
                        <p className="text-gray-200 text-xs sm:text-base mt-3 max-w-xl font-light leading-relaxed hidden sm:block">
                            تامین سریع کلیه قطعات موتوری، بدنه و جلوبندی خودروهای چری، ام‌وی‌ام، فونیکس و لوکانو با ارسال به سراسر کشور
                        </p>
                    </div>
                </div>
            </section>

            {/* ۲. سکشن دسته‌بندی‌ها */}
            <section className="container mx-auto px-4 sm:px-6">
                <CategorySection categories={categories} /> 
            </section>

            {/* ۳. سکشن پیشنهادهای شگفت‌انگیز (تخفیف‌ها بدون هیچ شرطی همیشه رندر میشه) */}
            <section className="container mx-auto px-4 sm:px-6">
                <OfferComponent discountProducts={discountProducts} />
            </section>

            {/* ۴. سکشن محصولات اصلی */}
            <section id="products" className="container mx-auto px-4 sm:px-6 py-3">
                <ProductsComponent products={products} />
            </section>
            {/* ۴. سکشن بنرهای تبلیغاتی */}
            <section className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Link 
                        href="/discounts" 
                        className="group relative block overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 aspect-16/8 sm:aspect-video"
                    >
                        <Image 
                            src="/images/banners/banner2.png" 
                            alt="بنر قطعات اصلی" 
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </Link>

                    <Link 
                        href="/products" 
                        className="group relative block overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 aspect-16/8 sm:aspect-video"
                    >
                        <Image 
                            src="/images/banners/banner1.png" 
                            alt="بنر خدمات چری یدک" 
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </Link>
                </div> 
            </section>


        </div>
    )
}