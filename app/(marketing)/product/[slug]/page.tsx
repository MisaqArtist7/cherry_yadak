// app/product/[slug]/page.tsx

import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/components/ui/AddToCartButton'

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // دریافت دیتای محصول از دیتابیس پریزما
    const product = await prisma.product.findUnique({
        where: { slug: decodedSlug },
        select: {
            id: true,
            title: true,
            slug: true,
            price: true,
            description: true,
            images: {
                select: {
                    url: true,
                },
            },
        },
    })

    if (!product) {
        notFound()
    }

    // محاسبات فرضی قیمت برای حفظ استایل زیبای دیجی‌کالایی (تخفیف ۸ درصدی)
    const basePrice = product.price;
    const discountPercent = 8;
    const oldPrice = Math.round(basePrice / (1 - discountPercent / 100));

    // دریافت محصولات مشابه به صورت داینامیک جهت پر کردن گرید پایین صفحه
    const similarProducts = await prisma.product.findMany({
        where: { NOT: { slug: decodedSlug } },
        take: 4,
        select: {
            title: true,
            slug: true,
            price: true,
            images: { select: { url: true } }
        }
    })

    return (
        <main className="min-h-screen p-4 md:p-8 bg-gray-50/50" dir="rtl">
            <div className="mx-auto  space-y-8">

                {/* ستون‌بندی اصلی ۳ ستونه به سبک دیجی‌کالا */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">

                    {/* ستون ۱: بخش تصویر و گالری محصول (سمت راست) */}
                    <div className="lg:col-span-3 flex flex-col items-center gap-6 lg:sticky lg:top-8">
                        <div className="w-full aspect-square border border-gray-100 rounded-2xl bg-white flex items-center justify-center p-4 relative group">
                            <span className="absolute top-3 right-3 bg-red-50 text-(--primaryColor) border border-red-100 px-2.5 py-1 rounded-xl font-bold">
                                {discountPercent}٪ تخفیف ویژه
                            </span>
                            <div className="relative w-55 h-55">
                                <Image
                                    src={product.images?.[0]?.url || '/no-image.png'}
                                    alt={product.title}
                                    fill
                                    sizes="369px"
                                    priority
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ستون ۲: عنوان، ویژگی‌های کلیدی و مشخصات (وسط) */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* اصالت کالا */}
                        <div className="flex items-center gap-3  text-(--primaryColor) font-bold">
                            <span className="bg-(--primaryColor)/5 px-3 py-1.5 rounded-xl">البرز سی‌ان‌سی</span>
                            <span className="text-gray-400" dir="ltr">/ {product.slug}</span>
                        </div>

                        {/* عنوان اصلی کالا */}
                        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug">
                            {product.title}
                        </h1>

                        {/* امتیاز و نظرات کاربران (بخش استاتیک طرح) */}
                        <div className="flex items-center gap-2  text-gray-400 border-b border-gray-100 pb-4">
                            <span className="text-amber-500 flex items-center gap-1 font-bold">
                                ★ ۴.۵
                            </span>
                            <span>•</span>
                            <span className="hover:text-gray-900 cursor-pointer font-bold">۲۴ دیدگاه کاربران</span>
                        </div>

                        {/* ویژگی‌های مهم محصول */}
                        <div className="space-y-4 pt-2">
                            <h3 className=" font-bold text-gray-900">ویژگی‌های خلاصه محصول:</h3>
                            <ul className="space-y-3">
                                <li className=" flex items-start gap-2">
                                    <span className="text-gray-400 font-bold">ضمانت بافت:</span>
                                    <span className="text-gray-800 font-medium">کالای درجه یک صنعتی (اصلی)</span>
                                </li>
                                <li className=" flex items-start gap-2">
                                    <span className="text-gray-400 font-bold">وضعیت ارسال:</span>
                                    <span className="text-gray-800 font-medium">آماده تحویل از انبار مرکزی</span>
                                </li>
                            </ul>
                        </div>

                        {/* بخش مشخصات فنی و توضیحات دیتابیس */}
                        {product.description && (
                            <div className="border-t border-gray-100 pt-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-md bg-(--primaryColor)"></span>
                                    <h2 className=" md: font-bold text-gray-900">توضیحات و نقد تخصصی محصول</h2>
                                </div>
                                <p className="text-gray-600  leading-7 text-justify font-medium">
                                    {product.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ستون ۳: باکس خرید چسبان / کارت قیمت (سمت چپ) */}
                    <div className="lg:col-span-3 bg-white border border-gray-200/70 rounded-2xl p-6 space-y-6 lg:sticky lg:top-8">
                        <h3 className=" font-bold text-gray-900 border-b border-gray-200/60 pb-3">وضعیت فروش و قیمت</h3>

                        <div className="space-y-4  text-gray-600 font-bold">
                            <div className="flex items-center gap-2.5">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>
                                <span>فروشنده: <span className="text-gray-900">البرز سی‌ان‌سی (تامین‌کننده اصلی)</span></span>
                            </div>
                            <div className="flex items-center gap-2.5 border-t border-gray-100 pt-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-13.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">گارانتی ۱۲ ماهه شرکتی البرز سی‌ان‌سی</span>
                            </div>
                        </div>

                        {/* بخش قیمت داینامیک */}
                        <div className="border-t border-gray-100 pt-4 text-left space-y-1">
                            <div className="flex justify-between items-center w-full">
                                <span className="bg-(--primaryColor) text-white  px-2 py-0.5 rounded-lg font-bold">{discountPercent}٪</span>
                                <span className="text-gray-400 line-through  font-bold">
                                    {oldPrice.toLocaleString('fa-IR')}
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 flex items-center justify-end gap-1 pt-1">
                                {product.price.toLocaleString('fa-IR')}
                                <span className=" font-bold text-gray-500">تومان</span>
                            </div>
                        </div>

                        <AddToCartButton productId={product.id} />
                    </div>

                </div>

                {/* بخش نشان‌های اعتماد دیجی‌کالایی */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 py-6 bg-white border border-gray-100 rounded-2xl p-4">
                    {[
                        { src: 'express-delivery', label: 'تحویل اکسپرس' },
                        { src: 'cash-on-delivery', label: 'پرداخت در محل' },
                        { src: 'support', label: 'پشتیبانی ۲۴/۷' },
                        { src: 'days-return', label: '۷ روز ضمانت بازگشت' },
                        { src: 'original-products', label: 'ضمانت اصل بودن' },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-3 group cursor-pointer">
                            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 group-hover:scale-105 group-hover:border-(--primaryColor)/30 transition-all duration-300">
                                <span className="text-gray-400  font-bold">✓</span>
                            </div>
                            <span className=" text-gray-600 font-bold transition-colors group-hover:text-gray-900">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* بخش کالاهای مشابه کاملاً پویا */}
                {similarProducts.length > 0 && (
                    <div className="space-y-4 bg-white border border-gray-100 rounded-2xl p-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <span className="w-2.5 h-2.5 rounded-md bg-(--primaryColor)"></span>
                            <h2 className=" text-gray-900 font-bold">کالاهای مشابه که شاید بپسندید</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {similarProducts.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/product/${item.slug}`}
                                    className="border border-gray-100 rounded-xl p-4 space-y-3 hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between group"
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
                                    <h3 className=" font-bold text-gray-800 line-clamp-2 h-8 leading-relaxed">
                                        {item.title}
                                    </h3>
                                    <div className="text-left pt-2 border-t border-gray-50">
                                        <span className=" text-gray-900 font-bold">
                                            {item.price.toLocaleString('fa-IR')}{' '}
                                            <span className=" text-gray-500 font-bold">تومان</span>
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