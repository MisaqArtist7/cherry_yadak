// app/actions/category.ts
'use server'

import prisma from '@/lib/prisma'
import { revalidatePath, revalidateTag } from 'next/cache'
import { writeFile } from 'fs/promises'
import path from 'path'

// تابع کمکی برای تبدیل نام به اسلاگ استاندارد فارسی/انگلیسی
function generateSlug(text: string): string {
    return text
        .trim()
        .toLowerCase()
        // جایگزینی فاصله‌ها و علامت‌های خط تیره تکراری با یک -
        .replace(/[\s\-_]+/g, '-')
        // حذف کاراکترهای غیرمجاز در URL (به‌جز حروف فارسی، انگلیسی، اعداد و -)
        .replace(/[^\w\u0600-\u06FF\-]/g, '')
        // حذف - از ابتدا و انتهای رشته
        .replace(/^-+|-+$/g, '')
}

// ۱. تابع ساخت دسته‌بندی جدید
export async function createCategoryAction(formData: FormData) {
    const name = formData.get('name') as string
    const parentId = formData.get('parentId') as string
    const imageFile = formData.get('image') as File

    if (!name) {
        return { success: false, message: 'نام دسته‌بندی الزامی است' }
    }

    const slug = generateSlug(name)
    let imageUrl: string | null = null

    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = `${Date.now()}-${imageFile.name}`
        const filePath = path.join(process.cwd(), 'public/uploads', fileName)

        await writeFile(filePath, buffer)
        imageUrl = `/uploads/${fileName}`
    }

    try {
        await prisma.categories.create({
            data: {
                name,
                slug,
                image: imageUrl ? imageUrl : '', 
                parentId: parentId ? Number(parentId) : null,
            },
        })
    } catch (error) {
        return { success: false, message: 'این دسته‌بندی یا اسلاگ قبلاً ثبت شده یا خطایی رخ داد' }
    }

    revalidateTag('categories', 'max')
    revalidatePath('/admin/products/category')
    return { success: true, message: 'دسته‌بندی با موفقیت ساخته شد' }
}

// ۲. تابع جدید: ویرایش دسته‌بندی موجود
export async function updateCategoryAction(categoryId: number, formData: FormData) {
    const name = formData.get('name') as string
    const parentIdRaw = formData.get('parentId') as string
    const imageFile = formData.get('image') as File | null

    if (!name) {
        return { success: false, message: 'نام دسته‌بندی الزامی است' }
    }

    const parentId = parentIdRaw ? Number(parentIdRaw) : null

    // بررسی اینکه دسته والد، خودش نباشد
    if (parentId === categoryId) {
        return { success: false, message: 'یک دسته‌بندی نمی‌تواند والد خودش باشد' }
    }

    const slug = generateSlug(name)
    let imageUrl: string | undefined = undefined

    // آپلود عکس جدید در صورت ارسال
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = `${Date.now()}-${imageFile.name}`
        const filePath = path.join(process.cwd(), 'public/uploads', fileName)

        await writeFile(filePath, buffer)
        imageUrl = `/uploads/${fileName}`
    }

    try {
        await prisma.categories.update({
            where: { id: categoryId },
            data: {
                name,
                slug,
                parentId,
                ...(imageUrl && { image: imageUrl }), // اگر عکس جدید آپلود شده بود، فیلد image بروزرسانی می‌شود
            },
        })
    } catch (error) {
        return { success: false, message: 'تغییرات ذخیره نشد؛ احتمالاً اسلاگ تکراری است یا خطایی رخ داد' }
    }

    revalidateTag('categories', 'max')
    revalidatePath('/admin/products/category')
    return { success: true, message: 'دسته‌بندی با موفقیت بروزرسانی شد' }
}


export async function deleteCategoryAction(categoryId: number) {
    try {
        // حذف دسته‌بندی (Prisma و دیتابیس خودکار تمام محصولاتش را هم پاک می‌کنند)
        await prisma.categories.delete({
            where: { id: categoryId },
        });

        revalidateTag('categories', 'max')
        revalidatePath("/admin/products/category");
        revalidatePath("/admin/products/manage-products"); // ریولید کردن صفحه مدیریت محصولات
        
        return { 
            success: true, 
            message: "دسته‌بندی و تمام محصولات مرتبط با آن با موفقیت حذف شدند." 
        };
    } catch (error) {
        return { 
            success: false, 
            message: "خطا در حذف دسته‌بندی" 
        };
    }
}