import prisma from "@/lib/prisma";
import CategoryForm from "@/features/admin/category/components/CategoryForm";
import CategoryListManager from "@/features/admin/category/components/CategoryListManager";

export default async function CreateCategoryPage() {
    // ۱. دریافت دسته‌های اصلی به همراه زیردسته‌های سطح اول (برای فرم انتخاب والد)
    const parentCategories = await prisma.categories.findMany({
        where: {
            parentId: null, // فقط دسته‌های اصلی
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
                    name: 'asc',
                },
            },
        },
        orderBy: {
            name: 'asc',
        },
    });

    // ۲. دریافت تمام دسته‌ها (برای نمایش در لیست پایین صفحه)
    const allCategories = await prisma.categories.findMany({
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
                            مدیریت و افزودن دسته‌بندی‌ها
                        </h1>
                        <p className="text-gray-500 font-medium  md:
                            mt-1">
                            تنظیم ساختار و دسته‌بندی محصولات فروشگاه
                        </p>
                    </div>
                    <span className="text-gray-500 font-bold bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl  shrink-0">
                        تنظیمات ساختار سایت
                    </span>
                </div>
                
                {/* بخش اول: فرم ساخت دسته‌بندی جدید */}
                <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
                    <h2 className="
                        md:text-base font-bold text-gray-800 mb-4 pb-2">
                        ساخت دسته‌بندی جدید
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <CategoryForm categories={parentCategories} />
                    </div>
                </div>

                {/* بخش دوم: لیست و ویرایش دسته‌بندی‌های موجود */}
                <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
                    <h2 className="
                        md:text-base font-bold text-gray-800 mb-4 pb-2">
                        لیست دسته‌بندی‌های ثبت‌شده ({allCategories.length})
                    </h2>
                    <CategoryListManager categories={allCategories} />
                </div>

            </div>
        </section>
    );
}