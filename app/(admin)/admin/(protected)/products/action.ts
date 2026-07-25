'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteProductAction(productId: number) {
    try {
        await prisma.product.delete({
            where: { id: productId }
        })
        
        // این دستور باعث میشه لیست محصولات در صفحه بدون رفرش آپدیت بشه
        revalidatePath('/admin/products')
        
        return { success: true }
    } catch (error) {
        console.error("خطا در حذف محصول:", error)
        return { success: false, error: "حذف محصول با خطا مواجه شد." }
    }
}

export async function updateStockAction(productId: number, newStock: number) {
    try {
        await prisma.product.update({
            where: { id: productId },
            data: { stock: newStock }
        })
        
        revalidatePath('/admin/products')
        return { success: true }
    } catch (error) {
        console.error("خطا در به روزرسانی موجودی:", error)
        return { success: false, error: "خطا در ثبت موجودی" }
    }
}