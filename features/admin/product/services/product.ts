'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function createProductAction(formData: FormData) {
    const title = formData.get('title') as string
    const price = formData.get('price') as string
    const discount = formData.get('discount') as string
    const stock = formData.get('stock') as string
    const categoryId = formData.get('categoryId') as string
    const brandId = formData.get('brandId') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File

    // اعتبارسنجی اولیه
    if (!title || !price || !categoryId || !brandId) {
        return { success: false, message: 'نام محصول، قیمت و دسته‌بندی الزامی هستن' }
    }
    
    // ساخت اسلاگ خودکار از روی عنوان (چون فرم input جدا براش نداره)
    const slug = title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')

    let imageUrl: string | null = null

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const uploadDir = path.join(process.cwd(), 'public/uploads')
        await mkdir(uploadDir, { recursive: true })

        const safeFileName = imageFile.name.replace(/\s+/g, '-')
        const fileName = `${Date.now()}-${safeFileName}`
        const filePath = path.join(uploadDir, fileName)

        await writeFile(filePath, buffer)
        imageUrl = `/uploads/${fileName}`
    }

    try {
        await prisma.product.create({
            data: {
                title,
                slug,
                price: Number(price),
                discount: discount ? Number(discount) : 0,
                stock: stock ? Number(stock) : 0,
                description: description || '',
                categoryId: Number(categoryId),
                brandId: Number(brandId),
                images: imageUrl
                    ? {
                        create: [{ url: imageUrl, isMain: true }],
                    }
                    : undefined,
            },
        })
    } catch (error) {
        return { success: false, message: 'خطایی در ثبت محصول رخ داد. ممکنه اسلاگ تکراری باشه.' }
    }

    revalidatePath('/admin/products/manage-products')
    return { success: true, message: 'محصول با موفقیت ثبت شد' }
}