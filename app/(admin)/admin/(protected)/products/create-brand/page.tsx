// app/admin/products/brand/page.tsx
import prisma from "@/lib/prisma";
import BrandForm from "@/features/admin/brand/components/BrandForm";
import BrandListManager from "@/features/admin/brand/components/BrandListManager";

export default async function ManageBrandsPage() {
    // دریافت تمام برندها
    const allBrands = await prisma.brand.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
        },
        orderBy: {
            id: 'desc',
        },
    });

    return (
        <section className="min-h-screen p-4 md:p-8 bg-gray-50/50"> 
            <div className="max-w-5xl mx-auto w-full space-y-6">
                
                {/* هدر صفحه */}
                <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                            مدیریت و افزودن برندها
                        </h1>
                        <p className="text-gray-500 font-medium text-xs md:text-sm mt-1">
                            تنظیم برندها و سازندگان محصولات فروشگاه
                        </p>
                    </div>
                    <span className="text-gray-500 font-bold bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-xs shrink-0">
                        مدیریت برندها
                    </span>
                </div>
                
                {/* بخش اول: فرم ساخت برند جدید */}
                <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-sm md:text-base font-bold text-gray-800 mb-4 pb-2">
                        ساخت برند جدید
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <BrandForm />
                    </div>
                </div>

                {/* بخش دوم: لیست و ویرایش برندهای موجود */}
                <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-sm md:text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        لیست برندهای ثبت‌شده ({allBrands.length})
                    </h2>
                    <BrandListManager brands={allBrands} />
                </div>

            </div>
        </section>
    );
}