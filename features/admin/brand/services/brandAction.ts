'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function CreateBrandAction(formData: FormData) {
    const name = formData.get('name') as string

    if (!name) { 
        return { success: false, message: 'نام الزامی میباشد' }
    }
    const slug = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    
    try {
        await prisma.brand.create({
            data: {
                name,
                slug,
            }
        })
    }
    catch (error) {
        return { success: false, message: 'این نامک قبلاً استفاده شده یا خطایی رخ داد' }
    }
    revalidatePath('/admin/products/create-brand')
    return { success: true, message: 'برند با موفقیت ساخته شد' }
}
