import prisma from "@/lib/prisma"
import Header from "@/components/layout/Admin/Header"
import Sidebar from "@/components/layout/Admin/Sidebar"
import CategoryForm from "@/features/admin/category/components/CategoryForm"

export default async function CreateCategoryPage() {
    const categories = await prisma.categories.findMany({
        select: { id: true, name: true },
    })
    return (
        <>
            {/* هدر بالا (کاملاً هماهنگ با تم) */}
            <Header />

            <section className="min-h-screen flex gap-8 p-6 md:p-8 font-semibold">         
                
                {/* سایدبار ادمین */}
                <Sidebar />
            
                {/* بخش فرم اصلی دسته‌بندی */}
                <div className="flex-1 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-8 border border-gray-100">
                    <div className="mb-8 pb-4 border-b border-gray-50 flex justify-between items-center">
                        <h1 className="text-xl font-black text-gray-900">فروشگاه - افزودن دسته‌بندی جدید</h1>
                        <span className=" font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md">تنظیمات ساختار سایت</span>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <CategoryForm categories={categories} />
                    </div>
                </div>

            </section>
        </>
    )
}