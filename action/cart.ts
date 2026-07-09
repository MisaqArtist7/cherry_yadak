// app/actions/cart.ts
'use server'

import  prisma  from "@/lib/prisma"
import { getOrCreateCart } from "@/lib/cart"
import { revalidatePath } from "next/cache"

export async function addToCart(productId: number, quantity: number = 1) {
    try {
        const cart = await getOrCreateCart()

        const existingItem = await prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId: cart.id, productId } },
        })

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            })
        } else {
            await prisma.cartItem.create({
                data: { cartId: cart.id, productId, quantity },
            })
        }

        revalidatePath("/cart")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, message: "خطا در افزودن به سبد خرید" }
    }
}

export async function removeFromCart(productId: number) {
    try {
        const cart = await getOrCreateCart()

        await prisma.cartItem.delete({
            where: { cartId_productId: { cartId: cart.id, productId } },
        })

        revalidatePath("/cart")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, message: "خطا در حذف از سبد خرید" }
    }
}

export async function updateQuantity(productId: number, quantity: number) {
    try {
        if (quantity < 1) {
            return removeFromCart(productId)
        }

        const cart = await getOrCreateCart()

        await prisma.cartItem.update({
            where: { cartId_productId: { cartId: cart.id, productId } },
            data: { quantity },
        })

        revalidatePath("/cart")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, message: "خطا در بروزرسانی تعداد" }
    }
}

export async function getCart() {
    return await getOrCreateCart()
}