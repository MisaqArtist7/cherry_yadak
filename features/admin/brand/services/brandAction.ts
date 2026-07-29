// app/actions/brand.ts
'use server'

import prisma from '@/lib/prisma'
import { revalidatePath, revalidateTag } from 'next/cache'

function generateSlug(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/[\s\-_]+/g, '-')
        .replace(/[^\w\u0600-\u06FF\-]/g, '')
        .replace(/^-+|-+$/g, '')
}

// ۱. ساخت برند جدید
export async function createBrandAction(formData: FormData) {
    const name = formData.get('name') as string

    if (!name) {
        return { success: false, message: 'نام برند الزامی است' }
    }

    const slug = generateSlug(name)

    try {
        await prisma.brand.create({
            data: {
                name,
                slug,
            },
        })
    } catch (error) {
        return { success: false, message: 'این برند یا اسلاگ قبلاً ثبت شده یا خطایی رخ داد' }
    }

    revalidateTag('admin-stats', 'max')
    revalidatePath('/admin/products/brand')
    return { success: true, message: 'برند با موفقیت ساخته شد' }
}

// ۲. ویرایش برند
export async function updateBrandAction(brandId: number, formData: FormData) {
    const name = formData.get('name') as string

    if (!name) {
        return { success: false, message: 'نام برند الزامی است' }
    }

    const slug = generateSlug(name)

    try {
        await prisma.brand.update({
            where: { id: brandId },
            data: {
                name,
                slug,
            },
        })
    } catch (error) {
        return { success: false, message: 'تغییرات ذخیره نشد' }
    }

    revalidateTag('admin-stats', 'max')
    revalidatePath('/admin/products/brand')
    return { success: true, message: 'برند با موفقیت بروزرسانی شد' }
}

// ۳. حذف برند
export async function deleteBrandAction(brandId: number) {
    try {
        await prisma.brand.delete({
            where: { id: brandId },
        })
        
        revalidateTag('admin-stats', 'max')
        revalidatePath('/admin/products/brand')
        return { success: true, message: 'برند با موفقیت حذف شد' }
    } catch (error) {
        return { success: false, message: 'خطا در حذف برند (احتمالاً محصولاتی به این برند متصل هستند)' }
    }
}