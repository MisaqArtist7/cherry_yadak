import { notFound } from "next/navigation";
import  prisma  from "@/lib/prisma";
import EditProductForm from "@/features/admin/product/components/EditProductForm";

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getProductBySlug(slug: string) {
    const decodedSlug = decodeURIComponent(slug)
    return await prisma.product.findUnique({
        where: { slug : decodedSlug },
        include: {
            images: true,
            category: true,
            brand: true,
        },
    });
}

export default async function EditProductPage({ params }: PageProps) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const categories = await prisma.categories.findMany();
    const brands = await prisma.brand.findMany();

    return (
        <EditProductForm 
            product={product} 
            categories={categories} 
            brands={brands} 
        />
    );
}