import prisma from "@/lib/prisma"
import DiscountsComponent from "@/features/marketing/discounts/components/page"

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function discountsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    
    // مشخص کردن صفحه فعلی (پیش‌فرض صفحه ۱)
    const currentPage = Number(resolvedParams.page) || 1;
    const pageSize = 24;

    // اجرای هم‌زمان کوئری‌ها برای سرعت بالاتر
    const [discountProducts, totalProducts] = await Promise.all([
        prisma.product.findMany({
            where: {
                discount: { gt: 0 }
            },
            select: {
                title: true,
                price: true,
                discount: true,
                description: true,
                images: {
                    where: { isMain: true },
                    select: { url: true },
                    take: 1,
                }
            },
            skip: (currentPage - 1) * pageSize, // رد کردن محصولات صفحات قبل
            take: pageSize, // تعداد محصول در هر صفحه
        }),
        // گرفتن تعداد کل محصولات برای محاسبه تعداد صفحات
        prisma.product.count({
            where: { discount: { gt: 0 } }
        })
    ]);

    // محاسبه تعداد کل صفحات
    const totalPages = Math.ceil(totalProducts / pageSize);

    return (
        <DiscountsComponent 
            discountProducts={discountProducts} 
            currentPage={currentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
        />
    )
}