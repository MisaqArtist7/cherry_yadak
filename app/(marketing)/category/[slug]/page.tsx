import Image from 'next/image'
import prisma from '@/lib/prisma'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    console.log("SLUG FROM URL:", slug) // 👈 موقتاً بذار، توی ترمینال چک کن چی چاپ میشه

    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: slug,
            },
        },
        include: {
            images: true,
        },
    })

    console.log("PRODUCTS FOUND:", products.length) // 👈 این هم موقتاً بذار

    return (
        <section className='container mx-auto px-5 py-10'>
            <h2 className="font-bold text-xl mb-6">محصولات این دسته‌بندی</h2>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.length === 0 && (
                    <p className="text-gray-500">محصولی در این دسته‌بندی یافت نشد.</p>
                )}

                {products.map((product) => {
                    const imageMain = product.images.find((img) => img.isMain) || product.images[0]
                    return (
                        <div key={product.id} className='bg-white rounded-md p-4 shadow-sm'>
                            <Image 
                                src={imageMain?.url || "/images/default.jpg"}
                                width={300} 
                                height={300} 
                                alt={product.title} 
                                className='w-full h-40 object-contain'
                            />
                            <p className="mt-2 font-bold text-sm">{product.title}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}