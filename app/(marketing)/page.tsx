import BrandsComponent from '@/features/marketing/home/components/BrandSection/page'
import ProductsComponent from '@/features/marketing/home/components/ProductSection/page'
import OfferComponent from '@/features/marketing/home/components/OfferSection/page'

import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export default async function page() {
    const categories = await prisma.categories.findMany()

    const products = await prisma.product.findMany({
        where: { 
            discount: {
                equals : 0
            }
        },
        select: {
            title: true,
            slug: true,
            description: true,
            price: true,
            images: {
                where: { isMain : true },
                select: {
                    url: true,
                },
                take : 1,
            }
        }
    })
    
    const discountProducts = await prisma.product.findMany({
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
            images : {
                where : { isMain : true },
                select : {
                    url : true,
                },
                take : 1,
            }
        }
    });
    
    return (
        <>  
            <section className='carousel_section'>
                <div className='relative'>
                    <div className='bg-black/20 inset-0 absolute backdrop-blur-[0.5px]'></div>
                    <Image src='/images/hero.jpg' width={2000} height={2000} alt='hero image' className='object-cover w-full h-138.75' />
                </div>
            </section>

            <section className='category_section container mx-auto px-5 py-10 text-gray-800'>
                {/* هدر بخش دسته‌بندی با استایل مدرن‌تر و دکمه آرشیو */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className='flex items-center justify-center gap-2'>
                        <span className="flex justify-center items-center h-4 w-4 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                        </span>
                        <h2 className="font-bold text-lg md:text-xl text-gray-950">
                            دسته‌بندی‌ها
                        </h2>
                    </div>
                    <div></div>
                </div>
                
                {/* گرید کاملاً ریسپانسیو */}
                <div className='category_wrapper grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
                    {categories.map((category) => (
                        <Link key={category.id} href={`category/${category.slug}`} className='bg-white rounded-md p-5 shadow-sm hover:shadow-md hover:shadow-rose-300 hover:border-(--primaryColor) transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-pointer'>
                            {/* دایره‌ی پس‌زمینه تصویر با افکت پالس ملایم در هاور */}
                            <div className='w-44 h-44 rounded-full bg-rose-50 flex items-center justify-center mb-4 relative transition-all duration-300 group-hover:bg-rose-100 group-hover:scale-105'>
                                <Image 
                                    src={category.image || "/images/default.jpg"}
                                    width={1111} 
                                    height={1111} 
                                    alt={category.name} 
                                    className='w-36 h-36 object-contain drop-shadow-md transition-transform duration-300 group-hover:-rotate-3' 
                                />
                            </div>
                            <span className='text-xs sm:text-sm font-extrabold text-gray-700 group-hover:text-(--primaryColor) transition-colors'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>  
            </section>

            <section className='offer_section container'>
                <OfferComponent discountProducts={discountProducts} />
            </section>
            
            <section className='products_section container mt-4'>
                <ProductsComponent products={products} />
            </section>
            
            <section className='brands_section mt-4'>
                <BrandsComponent />
            </section>  

            <section className='banner_section container mt-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div>
                        <Image src='/images/banner5.webp' width={1000} height={1000} alt='' className='w-full h-full object-contain rounded-md'/>
                    </div>
                    <div>
                        <Image src='/images/banner6.webp' width={1000} height={1000} alt='' className='w-full h-full object-contain rounded-md'/>
                    </div>
                </div>
            </section>
            
        </>
    )
}
