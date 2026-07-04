// app/actions/category.ts
'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function createCategoryAction(formData: FormData) {
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const parentId = formData.get('parentId') as string
    const imageFile = formData.get('image') as File

    if (!name || !slug) {
        return { success: false, message: 'نام و نامک الزامی هستن' }
    }

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
        return { success: false, message: 'این نامک قبلاً استفاده شده یا خطایی رخ داد' }
    }

    revalidatePath('/admin/products/category')
    return { success: true, message: 'دسته‌بندی با موفقیت ساخته شد' }
}