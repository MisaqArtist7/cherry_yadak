import ProductFormPage from "@/features/admin/product/components/ProductForm"
import prisma from "@/lib/prisma"

export default async function CreateProductPage() {
    // دریافت دسته‌بندی‌ها به ترتیب حروف الفبا
    const categories = await prisma.categories.findMany({
        where: {
            parentId: null, // فقط دسته‌های اصلی (والد) را بگیر
        },
        select: { 
            id: true,
            name: true,
            children: {
                select: {
                    id: true,
                    name: true,
                },
                orderBy: {
                    name: 'asc', // مرتب‌سازی زیردسته‌ها
                },
            },
        },
        orderBy: {
            name: 'asc', // مرتب‌سازی دسته‌های اصلی
        },
    })
    
    // دریافت برندها به ترتیب حروف الفبا
    const brands = await prisma.brand.findMany({
        select: { 
            id: true,
            name: true 
        },
        orderBy: {
            name: 'asc'
        }
    })

    return (
        <section className="min-h-screen flex gap-8 p-6 md:p-8">        
            {/* بخش فرم اصلی */}
            <div className="flex-1">
                <div className="mb-8 pb-5 border-b border-gray-50 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900">افزودن محصول جدید</h1>
                        <p className="text-gray-500 text-xl mt-1">مشخصات فنی و قیمت کالا را وارد کنید</p>
                    </div>
                    <span className="text-gray-400 font-medium bg-white border border-gray-100 px-3 py-1.5 rounded-xl text-lg">
                        مرحله ۱ از ۲
                    </span>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <ProductFormPage categories={categories} brands={brands}/>
                </div>
            </div>
        </section>
    )
}