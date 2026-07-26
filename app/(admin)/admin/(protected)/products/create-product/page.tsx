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
        <section className="min-h-screen p-4 md:p-8 bg-gray-50/50">      
            {/* بخش فرم اصلی */}
            <div className="max-w-5xl mx-auto w-full">
                <div className="mb-6 pb-4 border-b border-gray-200/60 flex justify-between items-center bg-white p-5 rounded-2xl border shadow-sm">
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                            افزودن محصول جدید
                        </h1>
                        <p className="text-gray-500 font-medium text-xs md:text-sm mt-1">
                            مشخصات فنی و قیمت کالا را وارد کنید
                        </p>
                    </div>
                    <span className="text-gray-500 font-bold bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-xs shrink-0">
                        مرحله ۱ از ۲
                    </span>
                </div>
                
                <div>
                    <ProductFormPage categories={categories} brands={brands}/>
                </div>
            </div>
        </section>
    )
}