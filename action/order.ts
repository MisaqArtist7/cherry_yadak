// app/actions/order.ts
'use server'

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { getOrCreateCart } from "@/lib/cart"
import { revalidatePath } from "next/cache"

async function getUserId(): Promise<number | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return null

    try {
        const payload = verifyToken(token) as { userId: number }
        return payload.userId
    } catch {
        return null
    }
}

export async function createOrder(addressId: number) {
    const userId = await getUserId()
    if (!userId) {
        return { success: false, message: "ابتدا وارد حساب کاربری شوید" }
    }

    const address = await prisma.address.findUnique({ where: { id: addressId } })
    if (!address || address.userId !== userId) {
        return { success: false, message: "آدرس معتبر نیست" }
    }

    const cart = await getOrCreateCart()

    if (cart.items.length === 0) {
        return { success: false, message: "سبد خرید شما خالی است" }
    }

    try {
        const order = await prisma.$transaction(async (tx) => {
            let totalAmount = 0
            const orderItemsData = []

            for (const item of cart.items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                })

                if (!product) {
                    throw new Error(`محصول یافت نشد`)
                }

                if (product.stock < item.quantity) {
                    throw new Error(
                        `موجودی محصول «${product.title}» کافی نیست (موجودی: ${product.stock})`
                    )
                }

                const discountedPrice = Math.round(
                    product.price - (product.price * product.discount) / 100
                )
                totalAmount += discountedPrice * item.quantity

                orderItemsData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: discountedPrice,
                })

                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                })
            }

            const newOrder = await tx.order.create({
                data: {
                    userId,
                    addressId,
                    totalAmount,
                    status: "PENDING",
                    items: {
                        create: orderItemsData,
                    },
                },
                include: { items: true },
            })

            await tx.cartItem.deleteMany({ where: { cartId: cart.id } })

            return newOrder
        })

        revalidatePath("/cart")
        revalidatePath("/profile/orders")

        return { success: true, order }
    } catch (error) {
        console.error(error)
        const message = error instanceof Error ? error.message : "خطا در ثبت سفارش"
        return { success: false, message }
    }
}

export async function getUserOrders(status?: string) {
    const userId = await getUserId()
    if (!userId) return []

    return await prisma.order.findMany({
        where: {
            userId,
            ...(status && status !== "all" ? { status: status as any } : {}),
        },
        include: {
            items: {
                include: { product: true },
            },
        },
        orderBy: { createdAt: "desc" },
    })
}