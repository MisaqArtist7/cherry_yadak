// app/actions/auth.ts (یا مسیر واقعی که خودت داری)
'use server'

import  prisma  from "@/lib/prisma"
import { signToken } from "@/lib/jwt"
import { cookies } from "next/headers"

const CART_COOKIE = "cart_session"

export async function loginOrRegister(phone: string, fullName?: string) {
    if (!phone) {
        return { success: false, message: "شماره تلفن الزامی است" }
    }

    let user = await prisma.user.findUnique({ where: { phone } })

    if (!user) {
        if (!fullName) {
            return { success: false, message: "کاربر یافت نشد، نام کامل را وارد کنید" }
        }
        user = await prisma.user.create({ data: { phone, fullName } })
    }

    const cookieStore = await cookies()

    // --- Merge کردن سبد مهمون به سبد یوزر ---
    const guestSessionId = cookieStore.get(CART_COOKIE)?.value

    if (guestSessionId) {
        const guestCart = await prisma.cart.findUnique({
            where: { sessionId: guestSessionId },
            include: { items: true },
        })

        if (guestCart && guestCart.items.length > 0) {
            const userCart = await prisma.cart.findUnique({
                where: { userId: user.id },
            })

            if (!userCart) {
                // اگه یوزر سبد نداشت، همون سبد مهمون رو مال خودش کن
                await prisma.cart.update({
                    where: { id: guestCart.id },
                    data: { userId: user.id, sessionId: null },
                })
            } else {
                // یوزر از قبل سبد داشت، آیتم‌های مهمون رو merge کن
                for (const item of guestCart.items) {
                    const existing = await prisma.cartItem.findUnique({
                        where: {
                            cartId_productId: {
                                cartId: userCart.id,
                                productId: item.productId,
                            },
                        },
                    })

                    if (existing) {
                        await prisma.cartItem.update({
                            where: { id: existing.id },
                            data: { quantity: existing.quantity + item.quantity },
                        })
                    } else {
                        await prisma.cartItem.create({
                            data: {
                                cartId: userCart.id,
                                productId: item.productId,
                                quantity: item.quantity,
                            },
                        })
                    }
                }
                // سبد مهمون دیگه لازم نیست، پاکش کن
                await prisma.cart.delete({ where: { id: guestCart.id } })
            }
        }

        cookieStore.delete(CART_COOKIE)
    }

    const token = signToken({ userId: user.id, phone: user.phone, role: user.role })

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })

    return { success: true, user: { id: user.id, fullName: user.fullName, phone: user.phone } }
}