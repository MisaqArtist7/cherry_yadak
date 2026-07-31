// app/product/[slug]/page.tsx

import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'

interface PageProps {
    params: Promise<{ slug: string }>
}

// کش کردن دیتای اصلی محصول
const getProductBySlug = unstable_cache(
    async (slug: string) => {
        return prisma.product.findUnique({
            where: { slug },
            select: {
                id: true,
                title: true,
                slug: true,
                price: true,
                description: true,
                categoryId: true, // برای پیدا کردن محصولات مشابه لازمشو داریم
                images: {
                    select: { url: true },
                },
            },
        })
    },
    ['product-by-slug'],
    { tags: ['products'] }
)

// کش کردن محصولات مشابه (بر اساس دسته‌بندی)
const getSimilarProducts = unstable_cache(
    async (slug: string, categoryId: number) => {
        return prisma.product.findMany({
            where: {
                NOT: { slug },
                categoryId,
            },
            take: 4,
            select: {
                title: true,
                slug: true,
                price: true,
                images: { select: { url: true } },
            },
        })
    },
    ['similar-products'],
    { tags: ['products'] }
)

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const product = await getProductBySlug(decodedSlug)

    if (!product) {
        notFound()
    }

    // محاسبات فرضی قیمت برای حفظ استایل زیبای دیجی‌کالایی (تخفیف ۸ درصدی)
    const basePrice = product.price
    const discountPercent = 8
    const oldPrice = Math.round(basePrice / (1 - discountPercent / 100))

    // محصولات مشابه واقعی (همون دسته‌بندی)
    const similarProducts = await getSimilarProducts(decodedSlug, product.categoryId)

    const sellerPhone = "9193385979"
    const rubikaUsername = "Alborz_Cnc"
    const baleUsername = "557291154"
    const telegramUsername = "cherry_yadak"

    const productUrl = `https://cherryyadak.ir/product/${product.slug}`
    const orderMessage = `سلام وقت بخیر، قصد سفارش این محصول را دارم:\n\n📌 محصول: ${product.title}\n💵 قیمت: ${product.price.toLocaleString('fa-IR')} تومان\n🔗 لینک محصول: ${productUrl}`
    return (
        <main className="min-h-screen p-4 md:p-8 bg-gray-50/50" dir="rtl">
            <div className="mx-auto space-y-8">

                {/* ستون‌بندی اصلی ۳ ستونه به سبک دیجی‌کالا */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">

                    {/* ستون ۱: بخش تصویر و گالری محصول (سمت راست) */}
                    <div className="lg:col-span-3 flex flex-col items-center gap-6 lg:sticky lg:top-8 h-full">
                        <div className="w-full aspect-square min-h-105 rounded-2xl bg-white flex items-center justify-center relative group overflow-hidden">
                            <span className="absolute top-3 right-3 z-10 bg-red-50 text-[#D92F4E] border border-red-100 px-2.5 py-1 rounded-xl font-bold  md: shadow-sm">
                                {discountPercent}٪ تخفیف ویژه
                            </span>
                            <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#D92F4E] opacity-[0.06] blur-3xl" />
                            <Image
                                src={product.images?.[0]?.url || '/no-image.png'}
                                alt={product.title}
                                fill
                                sizes="369px"
                                priority
                                className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* ستون ۲: عنوان، ویژگی‌های کلیدی و مشخصات (وسط) */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* اصالت کالا */}
                        <div className="flex items-center gap-3 text-[#D92F4E] font-bold">
                            <span className="bg-[#D92F4E]/5 px-3 py-1.5 rounded-xl ">البرز سی‌ان‌سی</span>
                            <span className="text-gray-400 " dir="ltr">/ {product.slug}</span>
                        </div>

                        {/* عنوان اصلی کالا */}
                        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug">
                            {product.title}
                        </h1>

                        {/* امتیاز و نظرات کاربران */}
                        <div className="flex items-center gap-2 text-gray-400 border-b border-gray-100 pb-4">
                            <span className="text-amber-500 flex items-center gap-1 font-bold">
                                ★ ۴.۵
                            </span>
                            <span>•</span>
                            <span className="hover:text-gray-900 cursor-pointer font-bold transition-colors">۲۴ دیدگاه کاربران</span>
                        </div>

                        {/* ویژگی‌های مهم محصول */}
                        <div className="space-y-4 pt-2">
                            <h3 className="font-bold text-gray-900">ویژگی‌های خلاصه محصول:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-400 font-bold">ضمانت بافت:</span>
                                    <span className="text-gray-800 font-medium">کالای درجه یک صنعتی (اصلی)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-400 font-bold">وضعیت ارسال:</span>
                                    <span className="text-gray-800 font-medium">آماده تحویل از انبار مرکزی</span>
                                </li>
                            </ul>
                        </div>

                        {/* بخش مشخصات فنی و توضیحات دیتابیس */}
                        {product.description && (
                            <div className="border-t border-gray-100 pt-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-md bg-[#D92F4E]"></span>
                                    <h2 className="font-bold text-gray-900">توضیحات و نقد تخصصی محصول</h2>
                                </div>
                                <p className="text-gray-600 leading-7 text-justify font-medium">
                                    {product.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ستون ۳: باکس خرید چسبان / کارت قیمت (سمت چپ - آپدیت‌شده برای واریز کارت به کارت) */}
                    <div className="lg:col-span-3 bg-white border border-gray-200/70 rounded-2xl p-6 space-y-5 lg:sticky lg:top-8 shadow-sm">
                        <h3 className="font-bold text-gray-900 border-b border-gray-200/60 pb-3">وضعیت فروش و قیمت</h3>

                        <div className="space-y-3.5  text-gray-600 font-bold">
                            <div className="flex items-center gap-2.5">
                                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>
                                <span>فروشنده: <span className="text-gray-900">البرز سی‌ان‌سی</span></span>
                            </div>
                            <div className="flex items-center gap-2.5 border-t border-gray-100 pt-3">
                                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-13.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">گارانتی ۱۲ ماهه شرکتی</span>
                            </div>
                        </div>

                        {/* بخش قیمت داینامیک */}
                        <div className="border-t border-gray-100 pt-4 text-left space-y-1.5">
                            <div className="flex justify-between items-center w-full">
                                <span className="bg-[#D92F4E] text-white px-2 py-0.5 rounded-lg font-bold  shadow-sm shadow-[#D92F4E]/20">{discountPercent}٪</span>
                                <span className="text-gray-400 line-through font-bold">
                                    {oldPrice.toLocaleString('fa-IR')}
                                </span>
                            </div>
                            <div className="text-2xl font-black text-gray-900 flex items-center justify-end gap-1 pt-1">
                                {product.price.toLocaleString('fa-IR')}
                                <span className="font-bold text-gray-500 ">تومان</span>
                            </div>
                        </div>

                        {/* دکمه‌های سفارش در پیام‌رسان‌ها */}
                        <div className="border-t border-gray-100 pt-4 space-y-2.5">
                            <span className=" text-gray-400 font-bold block mb-1">ثبت سفارش و ارسال فیش واریز از طریق:</span>
                            
                            {/* تلگرام */}
                            <a 
                                href={`https://t.me/${telegramUsername}?text=${encodeURIComponent(orderMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#007ab8] text-white font-extrabold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300  w-full active:scale-95"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.97.53-1.33.52-.4-.01-1.17-.22-1.74-.41-.7-.23-1.26-.35-1.21-.74.03-.2.3-.41.82-.62 3.2-1.39 5.34-2.31 6.42-2.76 3.05-1.27 3.68-1.49 4.1-.15.09.23.07.49.03.82z"/>
                                </svg>
                                ثبت سفارش در تلگرام
                            </a>

                            {/* واتس‌اپ */}
                            <a 
                                href={`https://wa.me/${sellerPhone}?text=${encodeURIComponent(orderMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300  w-full active:scale-95"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.016-5.078-2.87-6.932-1.851-1.852-4.312-2.871-6.927-2.872-5.412 0-9.81 4.397-9.813 9.802-.001 1.548.413 3.062 1.2 4.417l-.989 3.613 3.708-.973zm11.724-6.812c-.322-.161-1.902-.938-2.2-.1.297-.107-.402-.214-.585-.456-.16-.215-.16-.94-.323-1.236-.16-.295-.16-.51-.08-.67.08-.162.32-.242.484-.343.16-.1.24-.215.24-.35s-.08-.268-.16-.403c-.08-.134-.725-1.745-1.05-2.285-.313-.54-.603-.435-.826-.447-.213-.01-.456-.013-.698-.013-.24 0-.63.09-1.02.51-.39.42-1.49 1.457-1.49 3.554 0 2.1 1.527 4.124 1.74 4.42.21.297 3.01 4.598 7.29 6.45 1.02.44 1.81.7 2.43.9.1.28.32.51.52.82.2.3.44.4.67.4.24 0 .43-.13.56-.34.1-.17.1-.64.1-.94 0-.17-.08-.32-.24-.48z"/>
                                </svg>
                                سفارش در واتس‌اپ
                            </a>

                            {/* روبیکا */}
                            <a 
                                href={`https://rubika.ir/${rubikaUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#8C33FF] hover:bg-[#7826e0] text-white font-extrabold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300  w-full active:scale-95"
                            >
                                <span className="w-4 h-4 flex items-center justify-center bg-white/20 rounded-full text-[9px] font-black">R</span>
                                ثبت سفارش در روبیکا
                            </a>

                            {/* بله */}
                            <a 
                                href={`https://web.bale.ai/chat/search?uid=${baleUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#01a3a4] hover:bg-[#019394] text-white font-extrabold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300  w-full active:scale-95"
                            >
                                <span className="w-4 h-4 flex items-center justify-center bg-[#22a6b3]/20 rounded-full text-[9px] font-black">E</span>
                                ثبت سفارش در بله
                            </a>
                        </div>

                        {/* بخش توضیحات مراحل سفارش کارت به کارت */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 space-y-2 text-xs text-justify">
                            <span className=" text-[#D92F4E] font-bold block">مراحل خرید کارت‌به‌کارت:</span>
                            <div className="text-gray-500 leading-relaxed space-y-1.5 font-medium">
                                <p>۱. با زدن دکمه یکی از پیام‌رسان‌ها، اطلاعات محصول برای پشتیبانی ارسال کنید</p>
                                <p>۲. شماره کارت از پشتیبانی دریافت کنید</p>
                                <p>۳. آدرس خود را برای ارسال کالا اعلام کنید</p>
                                <p>۴. فیش واریز را ارسال کنید تا سفارش نهایی شود</p>
                            </div>
                        </div>

                    </div>

                </div>
                
                {/* بخش کالاهای مشابه کاملاً پویا (کاملاً بدون تغییر) */}
                {similarProducts.length > 0 && (
                    <div className="space-y-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <span className="w-2.5 h-2.5 rounded-md bg-[#D92F4E]"></span>
                            <h2 className="text-gray-900 font-bold">کالاهای مشابه که شاید بپسندید</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {similarProducts.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/product/${item.slug}`}
                                    className="border border-gray-100 hover:border-gray-200 rounded-xl p-4 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col justify-between group"
                                >
                                    <div className="relative h-55 w-55 flex justify-center p-2 bg-gray-50/50 rounded-lg aspect-square">
                                        <Image
                                            src={item.images?.[0]?.url || '/no-image.png'}
                                            alt={item.title}
                                            fill
                                            sizes="369px"
                                            className="object-contain p-2 group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <h3 className="font-bold text-gray-800 line-clamp-2 h-8 leading-relaxed group-hover:text-[#D92F4E] transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="text-left pt-2 border-t border-gray-50">
                                        <span className="text-gray-900 font-bold">
                                            {item.price.toLocaleString('fa-IR')}{' '}
                                            <span className="text-gray-500 font-bold">تومان</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </main>
    )
}