import prisma from "@/lib/prisma"
import DiscountsComponent from "@/features/marketing/discounts/components/page"
export default async function discountsPage() {
    
    const discountProducts = await prisma.product.findMany({
        where: {
            discount: {
                gt: 0
            }
        },
        select: {
            title: true,
            price: true,
            discount: true,
            description: true,
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
            <DiscountsComponent discountProducts={discountProducts} />
        </>
    )
}
