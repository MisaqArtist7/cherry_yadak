import ProductsComponent from '@/features/marketing/home/components/ProductSection/page'
import OfferComponent from '@/features/marketing/home/components/OfferSection/page'
import CategorySection from '@/features/marketing/home/components/CategoriesSection/page'

import Image from 'next/image'
import prisma from '@/lib/prisma'

export default async function page() {
    const categories = await prisma.categories.findMany({
        where: {
            parentId: null,
        }
    })

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
    console.log(products)
    
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
                <CategorySection categories={categories} />
            </section>

            <section className='offer_section container'>
                <OfferComponent discountProducts={discountProducts} />
            </section>
            
            <section className='products_section container mt-4'>
                <ProductsComponent products={products} />
            </section>
            
            <section className='banner_section container mt-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div className='shadow'>
                        <Image src='/images/banners/banner2.png' width={1000} height={1000} alt='' className='w-full h-full object-contain rounded-md'/>
                    </div>
                    <div>
                        <Image src='/images/banners/banner1.png' width={1000} height={1000} alt='' className='w-full h-full object-contain rounded-md'/>
                    </div>
                </div> 
            </section>

        </>
    )
}
