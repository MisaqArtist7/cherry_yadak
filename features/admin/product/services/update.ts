"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function updateProduct(productId: number, formData: FormData) {
    const title = formData.get("title") as string;
    const brandSlug = formData.get("brand") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount") || 0);
    const stock = Number(formData.get("stock"));
    const categorySlug = formData.get("category") as string;
    const description = formData.get("description") as string;
    
    // ۱. دریافت فایل تصویر از FormData
    const imageFile = formData.get("image") as File | null;
    let imageUrl: string | null = null;

    // ۲. پردازش و ذخیره تصویر در صورت انتخاب شدن عکس جدید
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // تولید نام منحصر‌به‌فرد برای جلوگیری از تداخل نام‌ها
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(imageFile.name) || ".jpg";
        const filename = `product-${uniqueSuffix}${ext}`;

        // مسیر ذخیره‌سازی در پوشه public/uploads
        const uploadDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadDir, { recursive: true });
        
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // مسیر قابل دسترس از وب
        imageUrl = `/uploads/${filename}`;
    }

    // ۳. به‌روزرسانی محصول در Prisma
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
            // اگر تصویر جدیدی آپلود شده باشد، جدول عکس‌ها نیز آپدیت می‌شود
            ...(imageUrl && {
                images: {
                    deleteMany: {}, // حذف عکس‌های قبلی (در صورت نیاز)
                    create: {
                        url: imageUrl,
                    },
                },
            }),
        },
    });

    revalidateTag("products", 'max');
    revalidatePath("/admin/products/manage-products");
    redirect("/admin/products/manage-products");
}