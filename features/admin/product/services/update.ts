"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(productId: number, formData: FormData) {
    const title = formData.get("title") as string;
    const brandSlug = formData.get("brand") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount") || 0);
    const stock = Number(formData.get("stock"));
    const categorySlug = formData.get("category") as string;
    const description = formData.get("description") as string;

    await prisma.product.update({
        where: { id: productId },
        data: {
            title,
            price,
            discount,
            stock,
            description,
            category: {
                connect: { slug: categorySlug },
            },
            brand: {
                connect: { slug: brandSlug },
            },
        },
    });
    revalidateTag('products', 'max')

    revalidatePath("/admin/products/manage-products");
    redirect("/admin/products/manage-products");
}