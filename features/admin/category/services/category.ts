// app/actions/category.ts
'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
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

export async function createCategoryAction(formData: FormData) {
    const name = formData.get('name') as string
    const parentId = formData.get('parentId') as string
    const imageFile = formData.get('image') as File

    if (!name) {
        return { success: false, message: 'نام دسته‌بندی الزامی است' }
    }

    // تولید خودکار اسلاگ از روی نام
    const slug = generateSlug(name)

    let imageUrl: string | null = null

    // اگه عکسی آپلود شده
    if (imageFile && imageFile.size > 0) {
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

    revalidatePath('/admin/products/category')
    return { success: true, message: 'دسته‌بندی با موفقیت ساخته شد' }
}