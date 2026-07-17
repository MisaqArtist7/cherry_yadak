import Sidebar from "@/components/layout/Admin/Sidebar"
import Header from "@/components/layout/Admin/Header"
import ProductFormPage from "@/features/admin/product/components/ProductForm"
import prisma from "@/lib/prisma"

export default async function CreateProductPage() {
    const categories = await prisma.categories.findMany({
        select: {  
            id: true,
            name: true,
        }
    })
    
    const brands = await prisma.brand.findMany({
        select: { 
            id: true,
            name: true 
        }
    })

    return (
        <>
            <section className="min-h-screen flex gap-8 p-6 md:p-8">         
                
                {/* بخش فرم اصلی */}
                <div className="flex-1 bg-white border border-gray-100 shadow-sm shadow-gray-200/50 rounded-2xl p-6 md:p-8">
                    <div className="mb-8 pb-5 border-b border-gray-50 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900">افزودن محصول جدید</h1>
                            <p className="text-gray-500 font-medium mt-1">مشخصات فنی و قیمت کالا را وارد کنید</p>
                        </div>
                        <span className="text-gray-400 font-medium bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-sm">
                            مرحله ۱ از ۲
                        </span>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <ProductFormPage categories={categories} brands={brands}/>
                    </div>
                </div>

            </section>
        </>
    )
}